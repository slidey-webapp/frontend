import { Box, Stack } from '@mui/system';
import { useMemo } from 'react';
import { RootState, useAppSelector } from '~/AppStore';
import DateTimeUtil from '~/utils/DateTimeUtil';
import { MessageDto } from '../types/message';

interface MessageItemProps {
    message: MessageDto;
}
const MessageItem = ({ message }: MessageItemProps) => {
    const authUser = useAppSelector((state: RootState) => state.auth.authUser);
    const isMine = useMemo(() => {
        if (!authUser) {
            return false;
        }
        return authUser.user.accountID === message.sender.accountID;
    }, [message, authUser]);

    const isAnonymous = !message.sender.accountID;

    return (
        <Stack direction="column" alignItems={isMine ? 'flex-end' : 'flex-start'} sx={{ width: '100%' }}>
            <Box
                component="p"
                sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    maxWidth: '70%',
                    fontSize: '.7rem',
                    ...(isAnonymous && { color: '#868686' }),
                }}
            >
                {message.sender.name}
            </Box>
            <Stack
                direction="column"
                sx={{
                    backgroundColor: isMine ? '#e7e7e7' : '#F5E7DC',
                    padding: '5px',
                    color: '#000',
                    borderRadius: '10px',
                    minWidth: '4rem',
                    maxWidth: '70%',
                    paddingBottom: '2px',
                    wordBreak: 'break-word',
                    '& span': {
                        lineHeight: '.8rem',
                        color: '#868686',
                        alignSelf: 'flex-end',
                    },
                }}
            >
                <Box
                    component="p"
                    sx={{
                        fontSize: '.8rem',
                    }}
                >
                    {message.content}
                </Box>
                <Box
                    component="span"
                    sx={{
                        fontSize: '.7rem',
                    }}
                >
                    {DateTimeUtil.formatDateTime(message.createdAt, 'HH:MM')}
                </Box>
            </Stack>
        </Stack>
    );
};

export default MessageItem;
