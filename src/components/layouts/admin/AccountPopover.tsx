import { Box, Divider, MenuItem, MenuList, Popover, PopoverVirtualElement, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useAppDispatch } from '~/AppStore';
import { logoutAsync } from '~/store/authSlice';

interface Props {
    anchorEl?: null | Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement);
    open: boolean;
    onClose?: () => void;
}

const AccountPopover: React.FC<Props> = ({ anchorEl, onClose, open }) => {
    const dispatch = useAppDispatch();
    const handleSignOut = useCallback(() => {
        onClose?.();
        dispatch(logoutAsync(() => null));
    }, [onClose]);

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom',
            }}
            onClose={onClose}
            open={open}
            PaperProps={{ sx: { width: 200 } }}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2,
                }}
            >
                <Typography variant="overline">Account</Typography>
                <Typography color="text.secondary" variant="body2">
                    Khoa tran
                </Typography>
            </Box>
            <Divider />
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '8px',
                    '& > *': {
                        borderRadius: 1,
                    },
                }}
            >
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
        </Popover>
    );
};

export default AccountPopover;
