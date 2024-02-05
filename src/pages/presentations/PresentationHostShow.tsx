import _ from 'lodash';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FullScreen, { FullScreenRef } from '~/components/full-screen/FullScreen';
import Loading from '~/components/loadings/Loading';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { PreviewSizeConstant } from '~/configs/constants';
import { Id } from '~/types/shared';
import { usePresentationDetail } from './api/usePresentationDetail';
import PresentationHotKeysOverview from './components/PresentationHotKeysOverview';
import PresentationShowBody from './components/shows/PresentationShowBody';
import PresentationShowFooter from './components/shows/PresentationShowFooter';
import { PresentationDto } from './types/presentation';
import { SlideDto } from './types/slide';

export interface IPresentationShowContext {
    presentationID: Id;
    presentation: PresentationDto;
    slides: SlideDto[];
    currentSlideId: Id;
    isFullScreen: boolean;
    isFirstSlide: boolean;
    isLastSlide: boolean;
    onFullScreen: () => void;
    onExitFullScreen: () => void;
    onSlideChange: (type: 'previous' | 'next') => void;
    onHotKeysOverview: () => void;
}

export const PresentationShowContext = createContext<IPresentationShowContext>({} as IPresentationShowContext);

export const usePresentationShowContext = () => useContext<IPresentationShowContext>(PresentationShowContext);

interface Props {}

interface State {
    presentation: PresentationDto;
    slides: SlideDto[];
    currentSlideId: Id;
    isFullScreen: boolean;
    isFirstSlide: boolean;
    isLastSlide: boolean;
}

const PresentationHostShow: React.FC<Props> = () => {
    const fullScreenRef = useRef<FullScreenRef>(null);
    const modalRef = useRef<ModalBaseRef>(null);

    const { presentationID } = useParams<{ presentationID: string }>();

    const navigate = useNavigate();

    const [state, setState] = useState<State>({
        presentation: {} as PresentationDto,
        slides: [],
        currentSlideId: '',
        isFullScreen: false,
        isFirstSlide: true,
        isLastSlide: true,
    });

    useEffect(() => {
        const keyDownHandler = (event: any) => {
            const keyCode = event.key;

            switch (keyCode) {
                case 'Escape':
                    navigate(-1);
                    return;
                case 'ArrowRight':
                    handleSlideChange('next');
                    return;
                case 'ArrowLeft':
                    handleSlideChange('previous');
                    return;
                case 'f':
                case 'F':
                    state.isFullScreen ? fullScreenRef.current?.exit() : fullScreenRef.current?.open();
                    return;
                case 'k':
                case 'K':
                    handleHotKeysOverview();
                    return;
                case null:
                default:
                    return;
            }
        };

        document.addEventListener<'keydown'>('keydown', keyDownHandler);

        return () => {
            document.removeEventListener<'keydown'>('keydown', keyDownHandler);
        };
    }, [state]);

    const { isFetching: isFetchingPresentation, refetch: refetchPresentation } = usePresentationDetail(presentationID, {
        onSuccess: res => {
            if (res.status !== 200 || _.isEmpty(res.data?.result)) return;

            const presentation = _.cloneDeep(res.data.result);
            const slides = _.cloneDeep(presentation.slides) || [];
            delete presentation.slides;

            const currentSlideIndex = slides.findIndex(
                x => x.slideID === (state.currentSlideId || slides?.[0]?.slideID),
            );

            const isFirstSlide = currentSlideIndex === 0;
            const isLastSlide = currentSlideIndex === slides.length - 1;

            setState(pre => ({
                ...pre,
                presentation,
                slides,
                isFirstSlide,
                isLastSlide,
                currentSlideId: pre.currentSlideId || slides?.[0]?.slideID,
            }));
        },
    });

    const handleSlideChange = (action: 'previous' | 'next') => {
        const currentSlideIndex = state.slides.findIndex(x => x.slideID === state.currentSlideId);

        const isCurrentFirstSlide = currentSlideIndex === 0;
        const isCurrentLastSlide = currentSlideIndex === state.slides.length - 1;

        if (isCurrentFirstSlide && action === 'previous') return;
        if (isCurrentLastSlide && action === 'next') return;

        const newCurrentSlideIndex = action === 'previous' ? currentSlideIndex - 1 : currentSlideIndex + 1;
        const newCurrentSlide = state.slides[newCurrentSlideIndex];

        const isFirstSlide = newCurrentSlideIndex === 0;
        const isLastSlide = newCurrentSlideIndex === state.slides.length - 1;

        setState(pre => ({
            ...pre,
            isFirstSlide,
            isLastSlide,
            currentSlideId: newCurrentSlide?.slideID,
        }));

        return;
    };

    const handleHotKeysOverview = () => {
        if (modalRef.current?.state === true) {
            modalRef.current?.onClose();
            return;
        }

        modalRef.current?.onOpen(<PresentationHotKeysOverview />, 'Tất cả các phím tắt', '50%');
    };

    const calculateScale = (): number => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const isLargerThanRootRatio =
            windowHeight / windowWidth > PreviewSizeConstant.HEIGHT / PreviewSizeConstant.WIDTH;

        return isLargerThanRootRatio
            ? windowWidth / PreviewSizeConstant.WIDTH
            : windowHeight / PreviewSizeConstant.HEIGHT;
    };

    if (isFetchingPresentation) return <Loading />;
    return (
        <PresentationShowContext.Provider
            value={{
                currentSlideId: state.currentSlideId,
                presentation: state.presentation,
                presentationID: presentationID as Id,
                slides: state.slides,
                isFullScreen: state.isFullScreen,
                isFirstSlide: state.isFirstSlide,
                isLastSlide: state.isLastSlide,
                onFullScreen: async () => await fullScreenRef.current?.open(),
                onExitFullScreen: async () => await fullScreenRef.current?.exit(),
                onSlideChange: handleSlideChange,
                onHotKeysOverview: handleHotKeysOverview,
            }}
        >
            <div
                className="w-full h-full bg-black"
                onKeyDown={event => {
                    console.log(event.key);
                }}
            >
                <FullScreen
                    ref={fullScreenRef}
                    onChange={state =>
                        setState(pre => ({
                            ...pre,
                            isFullScreen: state,
                        }))
                    }
                    className="w-full h-full"
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <div
                            className=" bg-white"
                            style={{
                                height: PreviewSizeConstant.HEIGHT,
                                width: PreviewSizeConstant.WIDTH,
                                transform: `scale(${calculateScale()})`,
                                aspectRatio: '16 / 9',
                            }}
                        >
                            <div className="w-full h-full flex flex-col">
                                <PresentationShowBody />
                                <PresentationShowFooter />
                            </div>
                        </div>
                    </div>
                    <ModalBase ref={modalRef} />
                </FullScreen>
            </div>
        </PresentationShowContext.Provider>
    );
};

export default PresentationHostShow;
