import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SocketEvent } from '~/configs/constants';
import { requestApi } from '~/libs/axios';
import { useSocketContext } from '~/providers/SocketProvider';
import { SESSION_JOIN_API } from './api/presentation.api';

interface Props {}

const PresentationJoinSession: React.FC<Props> = () => {
    const { code } = useParams<{ code: string }>();

    const { socket } = useSocketContext();

    const handleJoin = async () => {
        await requestApi('post', SESSION_JOIN_API, {
            code,
            name: `khoahenry${Math.random()}`,
        }).then(res => {
            !socket.connected && socket.connect();
            socket.emit(SocketEvent.JOIN_SESSION, {
                sessionID: res.data?.result?.presentation?.sessionID,
                participantID: res.data?.result?.participant?.participantID,
            });
        });
    }

    useEffect(() => {
        !socket.connected && socket.connect();

        socket.on(SocketEvent.START_PRESENTING, (props: any) => {
            console.log('props START_PRESENTING ', props)
        });

        return () => {
            socket.disconnect();
        };
    }, [])

    return (
        <div>
            <button
                onClick={handleJoin}
            >
                Click me
            </button>
        </div>
    );
};

export default PresentationJoinSession;
