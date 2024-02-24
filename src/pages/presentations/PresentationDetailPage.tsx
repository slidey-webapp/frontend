import _ from 'lodash';
import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Overlay, { OverlayRef } from '~/components/loadings/Overlay';
import { requestApi } from '~/libs/axios';
import { Id } from '~/types/shared';
import { PRESENTATION_UPDATE_API, SESSION_INITIAL_API, VISIT_HISTORY_API } from './api/presentation.api';
import { useCollaborationsQuery } from './api/useCollaborationsQuery';
import { usePresentationDetail } from './api/usePresentationDetail';
import PresentationHeader from './components/PresentationHeader';
import PresentationMain from './components/PresentationMain';
import { CollaborationDto } from './types/collaboration';
import { PresentationDto } from './types/presentation';
import { SessionDto } from './types/session';
import { SlideDto } from './types/slide';
interface Props {}

export interface IPresentationContext {
    presentationID: Id;
    presentation: PresentationDto;
    slides: SlideDto[];
    currentSlideId: Id;
    collaborations: CollaborationDto[];
    setCurrentSlideId: (id: Id) => void;
    mask: () => void;
    unmask: () => void;
    refetchPresentation: () => Promise<void>;
    refetchCollaborations: () => Promise<void>;
    onUpdatePresentation: (params: { name?: string; slides?: SlideDto[] }) => Promise<void>;
    onShowPresentation: (groupID?: Id) => void;
}

export const PresentationContext = createContext<IPresentationContext>({} as IPresentationContext);

export const usePresentationContext = () => useContext<IPresentationContext>(PresentationContext);

interface State {
    presentation: PresentationDto;
    slides: SlideDto[];
    currentSlideId: Id;
    collaborations: CollaborationDto[];
}

const PresentationDetailPage: React.FC<Props> = () => {
    const { presentationID } = useParams<{ presentationID: string }>();

    const navigate = useNavigate();

    const overlayRef = useRef<OverlayRef>(null);

    const [state, setState] = useState<State>({
        presentation: {} as PresentationDto,
        slides: [],
        currentSlideId: '',
        collaborations: [],
    });

    const { isFetching: isFetchingPresentation, refetch: refetchPresentation } = usePresentationDetail(presentationID, {
        onSuccess: res => {
            if (res.status !== 200 || _.isEmpty(res.data?.result)) return;

            const presentation = _.cloneDeep(res.data.result);
            const slides = _.cloneDeep(presentation.slides) || [];
            delete presentation.slides;
            requestApi('POST', VISIT_HISTORY_API, {
                assetID: presentation.presentationID,
                assetType: 'PRESENTATION',
            });
            setState(pre => ({
                ...pre,
                presentation,
                slides,
                currentSlideId: pre.currentSlideId || slides?.[0]?.slideID,
            }));
        },
    });

    const { isFetching: isFetchingCollaborations, refetch: refetchCollaborations } = useCollaborationsQuery(
        { presentationID: presentationID as Id },
        {
            onSuccess: res => {
                if (res.status !== 200) return;
                setState(pre => ({
                    ...pre,
                    collaborations: res.data.result?.items || [],
                }));
            },
        },
    );

    const handleUpdatePresentation = async (params: { name?: string; slides?: SlideDto[] }) => {
        if (!params.name) _.set(params, 'name', state.presentation.name || '');
        if (!params.slides) _.set(params, 'slides', state.slides || []);

        const response = await requestApi('post', PRESENTATION_UPDATE_API, {
            presentationID,
            ...params,
        });

        if (response.status === 200) await refetchPresentation();
    };

    const handleShowPresentation = async (groupID?: Id) => {
        overlayRef.current?.open();
        const response = await requestApi<{
            session: SessionDto;
            presentation: PresentationDto;
        }>('post', SESSION_INITIAL_API, {
            presentationID,
            groupID,
        });
        overlayRef.current?.close();

        if (response.status !== 200) return;

        const sessionId = response.data.result?.session?.sessionID;
        navigate('/presentation/show/' + sessionId);
    };

    const isLoading = useMemo(
        () => isFetchingPresentation || isFetchingCollaborations,
        [isFetchingPresentation || isFetchingCollaborations],
    );

    // todo: add skeleton loading here
    if (isLoading) return <div>Skeleton loading...</div>;
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
                    collaborations: state.collaborations,
                    setCurrentSlideId: id => setState(pre => ({ ...pre, currentSlideId: id })),
                    mask: () => overlayRef.current?.open(),
                    unmask: () => overlayRef.current?.close(),
                    refetchPresentation: async () => {
                        await refetchPresentation();
                    },
                    refetchCollaborations: async () => {
                        await refetchCollaborations();
                    },
                    onUpdatePresentation: handleUpdatePresentation,
                    onShowPresentation: handleShowPresentation,
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
