import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseForm from '~/components/forms/BaseForm';
import Overlay, { OverlayRef } from '~/components/loadings/Overlay';
import { SocketEvent } from '~/configs/constants';
import { requestApi } from '~/libs/axios';
import { useSocketContext } from '~/providers/SocketProvider';
import { Id } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { SESSION_JOIN_API } from './api/presentation.api';
import ParticipationShowContainer from './components/participation-show/ParticipationShowContainer';
import { ParticipantDto } from './types/participant';
import { PresentationDto } from './types/presentation';
import { SessionStatus } from './types/session';
import { SlideDto } from './types/slide';

interface Props {}

interface State {
    participant?: ParticipantDto;
    sessionStatus?: SessionStatus;
    sessionId?: Id;
    slide?: SlideDto;
}

const PresentationJoinSession: React.FC<Props> = () => {
    const { code } = useParams<{ code: string }>();
    const overlayRef = useRef<OverlayRef>(null);
    const { socket } = useSocketContext();

    const [state, setState] = useState<State>({});

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
            // todo: remove code param
            setState({});
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

                return (
                    <ParticipationShowContainer
                        slide={state.slide}
                        sessionID={state.sessionId as Id}
                        participantID={state.participant?.participantID as Id}
                    />
                );
            }
            case 'ENDED':
            case undefined:
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-screen relative flex items-center justify-center">
            {renderBody()}
            <Overlay ref={overlayRef} />
        </div>
    );
};

export default PresentationJoinSession;
