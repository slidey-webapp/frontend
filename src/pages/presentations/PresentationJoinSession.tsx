import _ from 'lodash';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { RootState, useAppSelector } from '~/AppStore';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseForm from '~/components/forms/BaseForm';
import Overlay, { OverlayRef } from '~/components/loadings/Overlay';
import { SocketEvent } from '~/configs/constants';
import { PaginatedList, requestApi } from '~/libs/axios';
import { useSocketContext } from '~/providers/SocketProvider';
import { Id } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { SESSION_JOIN_API, SESSION_MESSAGE_INDEX_API, SESSION_QUESTION_INDEX_API } from './api/presentation.api';
import ParticipationShowContainer from './components/participation-show/ParticipationShowContainer';
import { MessageDto } from './types/message';
import { ParticipantDto } from './types/participant';
import { PresentationDto } from './types/presentation';
import { QuestionDto } from './types/question';
import { SessionStatus } from './types/session';
import { SlideDto } from './types/slide';

export interface IPresentationJoinSessionContext {
    sessionID: Id;
    participantID: Id;
    slide?: SlideDto;
    questions: QuestionDto[];
    messages: MessageDto[];
}

export const PresentationJoinSessionContext = createContext<IPresentationJoinSessionContext>(
    {} as IPresentationJoinSessionContext,
);

export const usePresentationJoinSessionContext = () =>
    useContext<IPresentationJoinSessionContext>(PresentationJoinSessionContext);

interface Props {}

interface State {
    participant?: ParticipantDto;
    sessionStatus?: SessionStatus;
    sessionId?: Id;
    slide?: SlideDto;
    questions: QuestionDto[];
    messages: MessageDto[];
}

const PresentationJoinSession: React.FC<Props> = () => {
    const { code } = useParams<{ code: string }>();
    const overlayRef = useRef<OverlayRef>(null);
    const { socket } = useSocketContext();

    const { authUser } = useAppSelector((state: RootState) => state.auth);

    const [state, setState] = useState<State>({
        messages: [],
        questions: [],
    });

    const { refetch: refetchQuestionList } = useQuery({
        queryKey: ['QuestionList'],
        queryFn: () =>
            requestApi<PaginatedList<QuestionDto>>('get', SESSION_QUESTION_INDEX_API, null, {
                params: { sessionID: state.sessionId, offset: 0, limit: 100000 },
            }),
        onSuccess: res => {
            setState(pre => ({
                ...pre,
                questions: res.data.result?.items || [],
            }));
        },
        enabled: !!state.sessionId,
    });

    const { refetch: refetchMessageList } = useQuery({
        queryKey: ['MessageList'],
        queryFn: () =>
            requestApi<PaginatedList<MessageDto>>('get', SESSION_MESSAGE_INDEX_API, null, {
                params: { sessionID: state.sessionId, offset: 0, limit: 100000 },
            }),
        onSuccess: res => {
            setState(pre => ({
                ...pre,
                messages: res.data.result?.items || [],
            }));
        },
        enabled: !!state.sessionId,
    });

    const handleJoin = async (formValues: { code: string; name: string }) => {
        overlayRef.current?.open();
        const response = await requestApi<{
            presentation: PresentationDto;
            participant: ParticipantDto;
        }>('post', SESSION_JOIN_API, formValues);
        overlayRef.current?.close();

        if (response.status !== 200) {
            response.data.message && NotifyUtil.error(response.data.message);
            return;
        }

        const result = response.data.result;

        setState(pre => ({
            ...pre,
            participant: result?.participant,
            sessionId: result?.participant.sessionID,
            sessionStatus: 'STARTING',
        }));

        !socket.connected && socket.connect();
        socket.emit(SocketEvent.JOIN_SESSION, {
            sessionID: result?.presentation?.sessionID,
            participantID: result?.participant?.participantID,
            token: authUser?.token,
        });
    };

    useEffect(() => {
        !socket.connected && socket.connect();

        socket.on(SocketEvent.START_PRESENTING, ({ slide }: { sessionID: Id; slide: SlideDto }) => {
            setState(pre => ({
                ...pre,
                sessionStatus: 'STARTED',
                slide,
            }));
        });

        socket.on(SocketEvent.CHANGE_SLIDE, ({ slide }: { slide: SlideDto }) => {
            setState(pre => ({
                ...pre,
                slide,
            }));
        });

        socket.on(SocketEvent.END_SESSION, () => {
            setState({
                questions: [],
                messages: [],
            });
        });

        socket.on(SocketEvent.MESSAGE, async ({ message }: { message: MessageDto }) => {
            await refetchMessageList();
        });

        socket.on(SocketEvent.QUESTION, async ({ question }: { question: QuestionDto }) => {
            await refetchQuestionList();
        });

        socket.on(SocketEvent.UPVOTE_QUESTION, async ({ question }: { question: QuestionDto }) => {
            await refetchQuestionList();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const renderBody = () => {
        if (!state.participant)
            return (
                <div className="w-80 bg-white rounded-md shadow p-5 flex flex-col">
                    <BaseForm
                        onSubmit={formValues => handleJoin(formValues)}
                        fields={[
                            {
                                name: 'code',
                                classNameCol: 'col-span-12',
                                label: 'Mã bài thuyết trình',
                                type: 'text',
                                required: true,
                            },
                            {
                                name: 'name',
                                classNameCol: 'col-span-12',
                                label: 'Tên của bạn',
                                type: 'text',
                                required: true,
                            },
                        ]}
                        initialValues={{
                            code,
                        }}
                        buttons={{
                            submitButton: (
                                <ButtonBase className="w-full h-10 flex items-center" type="submit" title="Tham gia" />
                            ),
                        }}
                    />
                </div>
            );

        switch (state.sessionStatus) {
            case 'STARTING':
                return (
                    <div className="flex flex-col justify-center items-center">
                        <div
                            className="font-extrabold text-5xl"
                            style={{
                                textShadow: '0px 5px 5px #000000',
                            }}
                        >
                            {state.participant.name}
                        </div>
                        <div
                            className="mt-4 text-lg"
                            style={{
                                textShadow: '0px 2px 4px #000000',
                            }}
                        >
                            Bạn đã tham gia. Hãy đợi chủ phòng bắt đầu!
                        </div>
                    </div>
                );
            case 'STARTED': {
                if (!state.slide || _.isEmpty(state.slide)) return null;

                return <ParticipationShowContainer />;
            }
            case 'ENDED':
            case undefined:
            default:
                return null;
        }
    };

    return (
        <PresentationJoinSessionContext.Provider
            value={{
                participantID: state.participant?.participantID as Id,
                sessionID: state.sessionId as Id,
                slide: state.slide,
                questions: state.questions,
                messages: state.messages,
            }}
        >
            <div className="w-full h-screen relative flex items-center justify-center">
                {renderBody()}
                <Overlay ref={overlayRef} />
            </div>
        </PresentationJoinSessionContext.Provider>
    );
};

export default PresentationJoinSession;
