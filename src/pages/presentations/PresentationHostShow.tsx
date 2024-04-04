import _ from 'lodash';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppSelector } from '~/AppStore';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import FullScreen, { FullScreenRef } from '~/components/full-screen/FullScreen';
import Loading from '~/components/loadings/Loading';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { PreviewSizeConstant, SocketEvent } from '~/configs/constants';
import { PaginatedList, requestApi } from '~/libs/axios';
import { useSocketContext } from '~/providers/SocketProvider';
import { Id } from '~/types/shared';
import {
    SESSION_END_API,
    SESSION_MESSAGE_INDEX_API,
    SESSION_QUESTION_INDEX_API,
    SESSION_SLIDE_CHANGED_API,
} from './api/presentation.api';
import { useSessionDetail } from './api/useSessionDetail';
import PresentationHotKeysOverview from './components/PresentationHotKeysOverview';
import PresentationShowBody from './components/shows/PresentationShowBody';
import PresentationShowFooter, { PresentShowFooterRef } from './components/shows/PresentationShowFooter';
import { MessageDto } from './types/message';
import { ParticipantDto } from './types/participant';
import { PresentationDto } from './types/presentation';
import { QuestionDto } from './types/question';
import { SessionDto } from './types/session';
import { MultipleChoiceSlideOption, SlideDto } from './types/slide';

export interface IPresentationShowContext {
    sessionId: Id;
    session: SessionDto;
    presentation: PresentationDto;
    slides: SlideDto[];
    participants: ParticipantDto[];
    currentSlideId: Id;
    isFullScreen: boolean;
    isFirstSlide: boolean;
    isLastSlide: boolean;
    questions: QuestionDto[];
    isSeenNewestQuestion: boolean;
    messages: MessageDto[];
    wordCloudResults: WordCloudResult[];
    setState: React.Dispatch<React.SetStateAction<State>>;
    onFullScreen: () => void;
    onExitFullScreen: () => void;
    onSlideChange: (type: 'previous' | 'next') => void;
    onHotKeysOverview: () => void;
}

export const PresentationShowContext = createContext<IPresentationShowContext>({} as IPresentationShowContext);

export const usePresentationShowContext = () => useContext<IPresentationShowContext>(PresentationShowContext);

interface Props {}

interface WordCloudResult {
    slideID: Id;
    value: string;
    participantID: Id;
}

interface State {
    presentation: PresentationDto;
    session: SessionDto;
    slides: SlideDto[];
    participants: ParticipantDto[];
    currentSlideId: Id;
    isFullScreen: boolean;
    isFirstSlide: boolean;
    isLastSlide: boolean;
    questions: QuestionDto[];
    isSeenNewestQuestion: boolean;
    messages: MessageDto[];
    backgroundColor: string;
    wordCloudResults: WordCloudResult[];
}

const PresentationHostShow: React.FC<Props> = () => {
    const fullScreenRef = useRef<FullScreenRef>(null);
    const modalRef = useRef<ModalBaseRef>(null);
    const presentShowFooterRef = useRef<PresentShowFooterRef>(null);

    const authUser = useAppSelector((state: RootState) => state.auth.authUser);
    const { socket } = useSocketContext();

    const { sessionID } = useParams<{ sessionID: string }>();

    const navigate = useNavigate();

    const [state, setState] = useState<State>({
        presentation: {} as PresentationDto,
        session: {} as SessionDto,
        slides: [],
        participants: [],
        currentSlideId: '',
        isFullScreen: false,
        isFirstSlide: true,
        isLastSlide: true,
        questions: [],
        isSeenNewestQuestion: true,
        messages: [],
        backgroundColor: '#ffffff',
        wordCloudResults: [],
    });

    useEffect(() => {
        const keyDownHandler = async (event: any) => {
            const keyCode = event.key;

            switch (keyCode) {
                case 'Escape':
                    await handleEndSession();
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
                case 'm':
                case 'M':
                    const messageModalState = presentShowFooterRef.current?.getModalMessageState();
                    if (messageModalState) {
                        presentShowFooterRef.current?.onCloseMessageModal();
                        return;
                    }

                    presentShowFooterRef.current?.onOpenMessageModal();
                    return;
                case 'Q':
                case 'q':
                    const questionModalState = presentShowFooterRef.current?.getModalQuestionState();
                    if (questionModalState) {
                        presentShowFooterRef.current?.onCloseQuestionModal();
                        return;
                    }

                    presentShowFooterRef.current?.onOpenQuestionModal();
                    return;
                case null:
                default:
                    return;
            }
        };

        const handleBeforeUnload = (event: any) => {
            event.preventDefault();
            event.returnValue = '';
        };

        document.addEventListener<'keydown'>('keydown', keyDownHandler);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener<'keydown'>('keydown', keyDownHandler);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [state]);

    const handleEndSession = async () => {
        await requestApi('post', SESSION_END_API, {
            sessionID,
        }).then(() => {
            setState(pre => ({
                ...pre,
                session: {
                    ...pre.session,
                    status: 'ENDED',
                },
            }));
        });
    };

    useEffect(() => {
        !socket.connected && socket.connect();
        socket.emit(SocketEvent.HOST_JOIN_SESSION, {
            sessionID,
            accountID: authUser?.user.accountID,
            token: authUser?.token,
        });

        socket.on(SocketEvent.START_PRESENTING, ({ slide }: { sessionID: Id; slide: SlideDto }) => {
            setState(pre => ({
                ...pre,
                session: {
                    ...pre.session,
                    status: 'STARTED',
                },
            }));
        });

        socket.on(SocketEvent.JOIN_SESSION, ({ participant }: { sessionID: Id; participant: ParticipantDto }) => {
            setState(pre => ({
                ...pre,
                participants: pre.participants.some(x => x.participantID === participant.participantID)
                    ? pre.participants
                    : [...pre.participants, participant],
            }));
        });

        socket.on(
            SocketEvent.SUBMIT_SLIDE_RESULT,
            ({ option }: { sessionID: Id; option: MultipleChoiceSlideOption }) => {
                setState(pre => ({
                    ...pre,
                    slides: pre.slides.map(sl => {
                        if (sl.slideID !== option.slideID) return sl;
                        if (sl.type !== 'MULTIPLE_CHOICE' && sl.type !== 'WORD_CLOUD') return sl;
                        if (sl.type === 'MULTIPLE_CHOICE') {
                            sl.options = (sl.options || []).map(opt => {
                                if (opt.optionID !== option.optionID) return opt;

                                opt.chosenAmount = (opt.chosenAmount ?? 0) + 1;
                                return opt;
                            });

                            return sl;
                        }

                        sl.words = [...(sl.words || []), option.option];

                        return sl;
                    }),
                }));
            },
        );

        socket.on(SocketEvent.MESSAGE, async ({ message }: { message: MessageDto }) => {
            await fetchMessageList(sessionID);
        });

        socket.on(SocketEvent.QUESTION, async ({ question }: { question: QuestionDto }) => {
            await fetchQuestionList(sessionID);

            if (presentShowFooterRef.current?.getModalQuestionState()) return;

            setState(pre => ({
                ...pre,
                isSeenNewestQuestion: false,
            }));
        });

        socket.on(SocketEvent.UPVOTE_QUESTION, async ({ question }: { question: QuestionDto }) => {
            await fetchQuestionList(sessionID);
        });

        socket.on(SocketEvent.ANSWER_QUESTION, async ({ question: { questionID } }: { question: QuestionDto }) => {
            setState(pre => {
                const stateCloned = _.cloneDeep(pre);
                const questionsCloned = _.cloneDeep(pre.questions);

                const questionIndex = questionsCloned.findIndex(x => x.questionID == questionID);
                if (questionIndex === -1) return stateCloned;

                questionsCloned[questionIndex] = {
                    ...questionsCloned[questionIndex],
                    isAnswered: true,
                };

                stateCloned.questions = questionsCloned;

                return stateCloned;
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const { isFetching: isFetchingSession } = useSessionDetail(sessionID, {
        onSuccess: res => {
            if (res.status !== 200 || _.isEmpty(res.data?.result)) return;

            const presentation = _.cloneDeep(res.data.result.presentation);
            const session = _.cloneDeep(res.data.result.session);

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
                session,
                slides,
                isFirstSlide,
                isLastSlide,
                currentSlideId: slides?.[0]?.slideID,
                backgroundColor: slides?.[0]?.textBackground,
            }));
        },
    });

    const fetchQuestionList = async (sesId?: Id) => {
        if (!sesId) return;
        const response = await requestApi<PaginatedList<QuestionDto>>('get', SESSION_QUESTION_INDEX_API, null, {
            params: { sessionID: sesId, offset: 0, limit: 100000 },
        });
        if (response.status === 200) {
            setState(pre => ({
                ...pre,
                questions: response.data.result?.items || [],
            }));
        }
    };

    const fetchMessageList = async (sesId?: Id) => {
        if (!sesId) return;
        const response = await requestApi<PaginatedList<MessageDto>>('get', SESSION_MESSAGE_INDEX_API, null, {
            params: { sessionID: sesId, offset: 0, limit: 100000 },
        });
        if (response.status === 200) {
            setState(pre => ({
                ...pre,
                messages: response.data.result?.items || [],
            }));
        }
    };

    // const { refetch: refetchQuestionList } = useQuery({
    //     queryKey: ['QuestionList', sessionID],
    //     queryFn: () =>
    //         requestApi<PaginatedList<QuestionDto>>('get', SESSION_QUESTION_INDEX_API, null, {
    //             params: { sessionID, offset: 0, limit: 100000 },
    //         }),
    //     onSuccess: res => {
    //         setState(pre => ({
    //             ...pre,
    //             questions: res.data.result?.items || [],
    //         }));
    //     },
    // });

    // const { refetch: refetchMessageList } = useQuery({
    //     queryKey: ['MessageList', sessionID],
    //     queryFn: () =>
    //         requestApi<PaginatedList<MessageDto>>('get', SESSION_MESSAGE_INDEX_API, null, {
    //             params: { sessionID, offset: 0, limit: 100000 },
    //         }),
    //     onSuccess: res => {
    //         setState(pre => ({
    //             ...pre,
    //             messages: res.data.result?.items || [],
    //         }));
    //     },
    // });

    const handleSlideChange = async (action: 'previous' | 'next') => {
        const currentSlideIndex = state.slides.findIndex(x => x.slideID === state.currentSlideId);

        const isCurrentFirstSlide = currentSlideIndex === 0;
        const isCurrentLastSlide = currentSlideIndex === state.slides.length - 1;

        if (isCurrentFirstSlide && action === 'previous') return;
        if (isCurrentLastSlide && action === 'next') return;

        const newCurrentSlideIndex = action === 'previous' ? currentSlideIndex - 1 : currentSlideIndex + 1;
        const newCurrentSlide = state.slides[newCurrentSlideIndex];

        await requestApi('post', SESSION_SLIDE_CHANGED_API, {
            slideID: newCurrentSlide?.slideID,
            sessionID,
        });

        const isFirstSlide = newCurrentSlideIndex === 0;
        const isLastSlide = newCurrentSlideIndex === state.slides.length - 1;

        setState(pre => ({
            ...pre,
            isFirstSlide,
            isLastSlide,
            currentSlideId: newCurrentSlide?.slideID,
            backgroundColor: newCurrentSlide?.textBackground,
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

    if (isFetchingSession) return <Loading />;
    return (
        <PresentationShowContext.Provider
            value={{
                sessionId: sessionID as Id,
                currentSlideId: state.currentSlideId,
                presentation: state.presentation,
                session: state.session,
                slides: state.slides,
                participants: state.participants,
                isFullScreen: state.isFullScreen,
                isFirstSlide: state.isFirstSlide,
                isLastSlide: state.isLastSlide,
                messages: state.messages,
                questions: state.questions,
                isSeenNewestQuestion: state.isSeenNewestQuestion,
                wordCloudResults: state.wordCloudResults,
                onFullScreen: async () => await fullScreenRef.current?.open(),
                onExitFullScreen: async () => await fullScreenRef.current?.exit(),
                onSlideChange: handleSlideChange,
                onHotKeysOverview: handleHotKeysOverview,
                setState,
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
                            className=" bg-white "
                            style={{
                                height: PreviewSizeConstant.HEIGHT,
                                width: PreviewSizeConstant.WIDTH,
                                transform: `scale(${calculateScale()})`,
                                aspectRatio: '16 / 9',
                                background: state.backgroundColor,
                            }}
                        >
                            <div className="w-full h-full flex flex-col relative overflow-hidden">
                                <div
                                    className="w-full z-10"
                                    style={{
                                        height: 96,
                                    }}
                                >
                                    <div className="w-full h-full flex items-center justify-between px-4">
                                        <ButtonIconBase
                                            icon={'close'}
                                            tooltip="Thoát trình chiếu"
                                            color={'inherit'}
                                            size="large"
                                            style={{
                                                margin: 0,
                                                width: 48,
                                                height: 48,
                                                fontSize: 20,
                                                background: '#ededf099',
                                                color: 'black',
                                            }}
                                            onClick={async () => {
                                                await handleEndSession();
                                                navigate(-1);
                                            }}
                                        />
                                    </div>
                                </div>
                                <PresentationShowBody
                                    style={{
                                        height: 'calc(100% - 192px)',
                                    }}
                                />
                                <PresentationShowFooter
                                    ref={presentShowFooterRef}
                                    style={{
                                        height: 96,
                                    }}
                                />
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
