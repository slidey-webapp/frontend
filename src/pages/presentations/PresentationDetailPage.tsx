import _ from 'lodash';
import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Overlay, { OverlayRef } from '~/components/loadings/Overlay';
import { requestApi } from '~/libs/axios';
import { Id } from '~/types/shared';
import { PRESENTATION_UPDATE_API } from './api/presentation.api';
import { usePresentationDetail } from './api/usePresentationDetail';
import PresentationHeader from './components/PresentationHeader';
import PresentationMain from './components/PresentationMain';
import { PresentationDto } from './types/presentation';
import { SlideDto } from './types/slide';

interface Props {}

export interface IPresentationContext {
    presentationID: Id;
    presentation: PresentationDto;
    slides: SlideDto[];
    currentSlideId: Id;
    setCurrentSlideId: (id: Id) => void;
    mask: () => void;
    unmask: () => void;
    refetchPresentation: () => Promise<void>;
    onUpdatePresentation: (params: { name?: string; slides: SlideDto[] }) => Promise<void>;
}

export const PresentationContext = createContext<IPresentationContext>({} as IPresentationContext);

export const usePresentationContext = () => useContext<IPresentationContext>(PresentationContext);

interface State {
    presentation: PresentationDto;
    slides: SlideDto[];
    currentSlideId: Id;
}

const PresentationDetailPage: React.FC<Props> = () => {
    const { presentationID } = useParams<{ presentationID: string }>();

    const overlayRef = useRef<OverlayRef>(null);

    const [state, setState] = useState<State>({
        presentation: {} as PresentationDto,
        slides: [],
        currentSlideId: '',
    });

    const { isFetching: isFetchingPresentation, refetch: refetchPresentation } = usePresentationDetail(presentationID, {
        onSuccess: res => {
            if (res.status !== 200 || _.isEmpty(res.data?.result)) return;

            const presentation = _.cloneDeep(res.data.result);
            const slides = _.cloneDeep(presentation.slides) || [];
            delete presentation.slides;

            setState(pre => ({
                presentation,
                slides,
                currentSlideId: pre.currentSlideId || slides?.[0]?.slideID,
            }));
        },
    });

    const handleUpdatePresentation = async (params: { name?: string; slides: SlideDto[] }) => {
        if (!params.name) _.set(params, 'name', state.presentation.name || '');

        const response = await requestApi('post', PRESENTATION_UPDATE_API, {
            presentationID,
            ...params,
        });

        if (response.status === 200) await refetchPresentation();
    };

    const isLoading = useMemo(() => isFetchingPresentation, [isFetchingPresentation]);

    // todo: add skeleton loading here
    if (isLoading) return <div>Skeleton loding...</div>;
    return (
        <div
            className="w-screen h-screen relative overflow-hidden flex flex-col select-none"
            style={{
                maxWidth: '100vw',
                maxHeight: '100vh',
            }}
        >
            <PresentationContext.Provider
                value={{
                    presentationID: presentationID as Id,
                    presentation: state.presentation,
                    slides: state.slides,
                    currentSlideId: state.currentSlideId,
                    setCurrentSlideId: id => setState(pre => ({ ...pre, currentSlideId: id })),
                    mask: () => overlayRef.current?.open(),
                    unmask: () => overlayRef.current?.close(),
                    refetchPresentation: async () => {
                        await refetchPresentation();
                    },
                    onUpdatePresentation: handleUpdatePresentation,
                }}
            >
                <PresentationHeader />
                <PresentationMain />
            </PresentationContext.Provider>
            <Overlay ref={overlayRef} />
        </div>
    );
};

export default PresentationDetailPage;
