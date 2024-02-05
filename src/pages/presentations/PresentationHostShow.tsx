import _ from 'lodash';
import React, { createContext, useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import FullScreen, { FullScreenRef } from '~/components/full-screen/FullScreen';
import Loading from '~/components/loadings/Loading';
import { PreviewSizeConstant } from '~/configs/constants';
import { Id } from '~/types/shared';
import { usePresentationDetail } from './api/usePresentationDetail';
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

    const { presentationID } = useParams<{ presentationID: string }>();

    const [state, setState] = useState<State>({
        presentation: {} as PresentationDto,
        slides: [],
        currentSlideId: '',
        isFullScreen: false,
        isFirstSlide: true,
        isLastSlide: true,
    });

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
            }}
        >
            <div className="w-full h-full bg-black">
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
                                aspectRatio: '16 / 9'
                            }}
                        >
                            <div className="w-full h-full flex flex-col">
                                <PresentationShowBody />
                                <PresentationShowFooter />
                            </div>
                        </div>
                    </div>
                </FullScreen>
            </div>
        </PresentationShowContext.Provider>
    );
};

export default PresentationHostShow;
