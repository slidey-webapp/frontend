import _ from 'lodash';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppSelector } from '~/AppStore';
import Forbidden from '~/components/errors/Forbidden';
import Loading from '~/components/loadings/Loading';
import Overlay, { OverlayRef } from '~/components/loadings/Overlay';
import { SocketEvent } from '~/configs/constants';
import { requestApi } from '~/libs/axios';
import { useSocketContext } from '~/providers/SocketProvider';
import { User } from '~/types/auth';
import { ChartType, HorizontalAlignment, Id, VerticalAlignment } from '~/types/shared';
import HistoryUtil from '~/utils/HistoryUtil';
import {
    PRESENTATION_UPDATE_API,
    SESSION_END_API,
    SESSION_INITIAL_API,
    VISIT_HISTORY_API,
} from './api/presentation.api';
import { useCollaborationsQuery } from './api/useCollaborationsQuery';
import { usePresentationDetail } from './api/usePresentationDetail';
import PresentationHeader from './components/PresentationHeader';
import PresentationMain from './components/PresentationMain';
import { CollaborationDto } from './types/collaboration';
import { PresentationDto } from './types/presentation';
import { SessionDto } from './types/session';
import { SlideDto, SlideLayout } from './types/slide';
import NotifyUtil from '~/utils/NotifyUtil';
interface Props {}

export interface IPresentationContext {
    presentationID: Id;
    presentation: PresentationDto;
    slides: SlideDto[];
    currentSlideId: Id;
    collaborations: CollaborationDto[];
    usersOnline: Id[];
    hover: PlacementHover;
    isOwner: boolean;
    previousRoute: string;
    setHoverState: React.Dispatch<React.SetStateAction<PlacementHover>>;
    setState: React.Dispatch<React.SetStateAction<State>>;
    setCurrentSlideId: (id: Id) => void;
    mask: () => void;
    unmask: () => void;
    onUpdatePresentation: (params: { name?: string; slides?: SlideDto[] }) => Promise<void>;
    onShowPresentation: (groupID?: Id) => void;
}

export interface PlacementHover {
    verticalAlignment: VerticalAlignment | null;
    horizontalAlignment: HorizontalAlignment | null;
    chartType: ChartType | null;
    layout: SlideLayout | null;
}

export const PresentationContext = createContext<IPresentationContext>({} as IPresentationContext);

export const usePresentationContext = () => useContext<IPresentationContext>(PresentationContext);

interface State {
    presentation: PresentationDto;
    slides: SlideDto[];
    currentSlideId: Id;
    collaborations: CollaborationDto[];
    reRender: boolean;
    previousRoute: string;
}

const PresentationDetailPage: React.FC<Props> = () => {
    const { presentationID } = useParams<{ presentationID: string }>();

    const location = useLocation();

    const navigate = useNavigate();
    const authUser = useAppSelector((state: RootState) => state.auth.authUser);
    const { socket } = useSocketContext();

    const overlayRef = useRef<OverlayRef>(null);
    const userOnlineRef = useRef<Id[]>(authUser?.user ? [authUser.user.accountID] : []);

    const [state, setState] = useState<State>({
        presentation: {} as PresentationDto,
        slides: [],
        currentSlideId: '',
        collaborations: [],
        reRender: false,
        previousRoute: '/dashboard/presentation',
    });

    useEffect(() => {
        if (location.state?.previousRoute) {
            setState(pre => ({
                ...pre,
                previousRoute: location.state?.previousRoute,
            }));
        }
    }, []);

    const [hoverState, setHoverState] = useState<PlacementHover>({
        verticalAlignment: null,
        horizontalAlignment: null,
        chartType: null,
        layout: null,
    });
    const [isForbidden, setIsForbidden] = useState<boolean>(false);

    useEffect(() => {
        !socket.connected && socket.connect();
        socket.emit(SocketEvent.JOIN_EDIT_PRESENTATION, {
            presentationID,
            accountID: authUser?.user.accountID,
            token: authUser?.token,
        });

        socket.on(SocketEvent.JOIN_EDIT_PRESENTATION, ({ allUsers }: { user: User; allUsers: User[] }) => {
            userOnlineRef.current = allUsers.map(x => x.accountID);

            setState(pre => ({
                ...pre,
                reRender: !pre.reRender,
            }));
        });

        socket.on(SocketEvent.LEAVE_EDIT_PRESENTATION, ({ allUsers }: { user: User; allUsers: User[] }) => {
            userOnlineRef.current = allUsers.map(x => x.accountID);
            setState(pre => ({
                ...pre,
                reRender: !pre.reRender,
            }));
        });

        socket.on(
            SocketEvent.UPDATE_PRESENTATION,
            ({ presentation }: { presentation: PresentationDto & { slides?: SlideDto[] } }) => {
                const newSlides = _.cloneDeep(presentation.slides) || [];
                if (_.isEmpty(newSlides)) return;

                delete presentation.slides;

                setState(pre => {
                    const preState = _.cloneDeep(pre);

                    let currentId = preState.currentSlideId;

                    const isCurrentSlideDeleted = newSlides.every(x => x.slideID !== currentId);

                    if (isCurrentSlideDeleted) {
                        const currentIndex = preState.slides.findIndex(x => x.slideID === currentId);
                        if (currentIndex <= 0) {
                            currentId = newSlides[0]?.slideID;
                        } else {
                            currentId = newSlides[currentIndex - 1]?.slideID;
                        }
                        HistoryUtil.pushSearchParams(navigate, {
                            current: currentId,
                        });
                    }

                    return {
                        ...preState,
                        presentation: {
                            ...presentation,
                            creator: preState.presentation.creator,
                        },
                        slides: newSlides,
                        currentSlideId: currentId,
                    };
                });
            },
        );

        socket.on(SocketEvent.JOIN_COLLAB, ({ user }: { user: User }) => {
            setState(pre => {
                const preState = _.cloneDeep(pre);
                const isExist = preState.collaborations.some(x => x.accountID === user.accountID);
                if (isExist) return preState;
                preState.collaborations.push({
                    accountID: user.accountID,
                    fullname: user.fullname,
                    email: user.email,
                } as CollaborationDto);

                return preState;
            });
        });

        socket.on(SocketEvent.REMOVE_COLLAB, ({ accountID }: { accountID: Id }) => {
            const isRemove = authUser?.user.accountID === accountID;
            if (!isRemove) return;
            setIsForbidden(true);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const { isFetching: isFetchingPresentation } = usePresentationDetail(presentationID, {
        onSuccess: res => {
            if (res.status === 403) {
                setIsForbidden(true);
                return;
            }
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
                currentSlideId: _.toNumber(HistoryUtil.getSearchParam('current') || slides?.[0]?.slideID),
            }));
        },
    });

    const { isFetching: isFetchingCollaborations } = useCollaborationsQuery(
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

        await requestApi('post', PRESENTATION_UPDATE_API, {
            presentationID,
            ...params,
        });
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

        if (response.status === 400) {
            NotifyUtil.warn(
                'Bài thuyết trình đang được trình chiếu, vui lòng kết thúc phiên trình chiếu đề bắt đầu phiên mới!',
            );

            return;
        }
        if (response.status !== 200) return;

        const sessionId = response.data.result?.session?.sessionID;
        navigate('/presentation/show/' + sessionId);
    };

    const isLoading = useMemo(
        () => isFetchingPresentation || isFetchingCollaborations,
        [isFetchingPresentation || isFetchingCollaborations],
    );

    const renderBody = () => {
        let body = null;
        if (isLoading) body = <Loading />;
        else if (isForbidden) body = <Forbidden />;
        else
            body = (
                <>
                    <PresentationContext.Provider
                        value={{
                            presentationID: presentationID as Id,
                            presentation: state.presentation,
                            slides: state.slides,
                            currentSlideId: state.currentSlideId,
                            collaborations: state.collaborations,
                            usersOnline: userOnlineRef.current,
                            hover: hoverState,
                            isOwner: authUser?.user.accountID === state.presentation.createdBy,
                            previousRoute: state.previousRoute,
                            setCurrentSlideId: id => {
                                HistoryUtil.pushSearchParams(navigate, {
                                    current: id,
                                });
                                setState(pre => ({ ...pre, currentSlideId: id }));
                            },
                            setHoverState,
                            setState,
                            mask: () => overlayRef.current?.open(),
                            unmask: () => overlayRef.current?.close(),
                            onUpdatePresentation: handleUpdatePresentation,
                            onShowPresentation: handleShowPresentation,
                        }}
                    >
                        <PresentationHeader />
                        <PresentationMain />
                    </PresentationContext.Provider>
                    <Overlay ref={overlayRef} />
                </>
            );

        return (
            <div
                className="w-screen h-screen relative overflow-hidden flex flex-col select-none"
                style={{
                    maxWidth: '100vw',
                    maxHeight: '100vh',
                }}
            >
                {body}
            </div>
        );
    };

    return renderBody();
};

export default PresentationDetailPage;
