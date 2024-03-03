import { useCallback, useEffect, useRef, useState } from 'react';
import { Id } from '~/types/shared';
import { requestApi } from '~/libs/axios';
import { SESSION_MESSAGE_API } from '../api/session.api';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { Box, CircularProgress, Stack } from '@mui/material';
import MessageItem from './MessageItem';
import Empty from '~/components/layouts/Empty';
import { MessageDto } from '~/pages/presentations/types/message';

interface MessageListProps {
    sessionID: Id;
    isVisible: boolean;
}

const MessageList = ({ sessionID, isVisible }: MessageListProps) => {
    const [messageList, setMessageList] = useState<MessageDto[]>([]);
    const [isOver, setIsOver] = useState<boolean>(false);

    const listRef = useRef<HTMLElement | null>(null);
    const oldScrollHeightRef = useRef(0);
    const isInitalRef = useRef(true);

    const fetchMessages = useCallback(async () => {
        if (isOver) {
            return;
        }
        const lastMessageID = messageList.length ? messageList[messageList.length - 1].messageID : null;
        const response = await requestApi('get', SESSION_MESSAGE_API, {
            lastMessageID,
            sessionID,
        });
        if (response.data && response.data.result) {
            const messages = (response.data.result.items || []) as MessageDto[];
            if (messages.length) {
                setMessageList(prev => [...messages, ...prev]);
            } else {
                setIsOver(true);
            }
        }
        setIsFetching(false);
    }, [messageList, isOver]);

    const { isFetching, setIsFetching, setElement } = useInfiniteScroll(fetchMessages, 'top');

    useEffect(() => {
        if (isInitalRef.current) {
            setElement(listRef.current);
            fetchMessages();
        }
        isInitalRef.current = false;
    }, [fetchMessages]);

    useEffect(() => {
        if (!isFetching && isVisible) {
            if (listRef.current && oldScrollHeightRef.current !== listRef.current.scrollHeight) {
                listRef.current.scrollTop = listRef.current.scrollHeight - oldScrollHeightRef.current;
                oldScrollHeightRef.current = listRef.current.scrollHeight;
            }
        }
    }, [isFetching, isVisible]);

    if (messageList.length === 0)
        return (
            <div className="base-grid w-full h-full">
                <Empty />
            </div>
        );
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
            }}
            className="base-grid"
        >
            <Box
                sx={{
                    width: '100%',
                    flex: '1 1 auto',
                    position: 'relative',
                    overflow: 'auto',
                }}
                ref={listRef}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                    }}
                >
                    <Stack
                        direction="column"
                        spacing={1}
                        paddingX={1}
                        alignItems="flex-start"
                        sx={{
                            paddingBottom: '4rem',
                            paddingTop: !isOver ? 0 : '1rem',
                            marginLeft: '0.5rem',
                            marginRight: '0.5rem',
                        }}
                    >
                        {!isOver && (
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                    width: '100%',
                                    visibility: isFetching ? 'visible' : 'hidden',
                                    marginY: '1rem',
                                }}
                            >
                                <CircularProgress size={20} />
                            </Stack>
                        )}

                        {messageList.map(item => {
                            return <MessageItem key={item.messageID} message={item} />;
                        })}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default MessageList;
