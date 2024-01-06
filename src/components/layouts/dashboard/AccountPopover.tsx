import { Box, Divider, MenuItem, MenuList, Popover, PopoverVirtualElement, Typography } from '@mui/material';
import { useCallback, useRef } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '~/AppStore';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { logoutAsync } from '~/store/authSlice';
import ChangePassword from '../ChangePassword';
import CreatePassword from '../CreatePassword';

interface Props {
    anchorEl?: null | Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement);
    open: boolean;
    onClose?: () => void;
}

const AccountPopover: React.FC<Props> = ({ anchorEl, onClose, open }) => {
    const dispatch = useAppDispatch();
    const { authUser } = useAppSelector((state: RootState) => state.auth);

    const modalRef = useRef<ModalBaseRef>(null);

    const handleSignOut = useCallback(() => {
        onClose?.();
        dispatch(logoutAsync(() => null, true));
    }, [onClose]);

    const handleChangePassword = () => {
        modalRef.current?.onOpen(<ChangePassword onClose={modalRef.current?.onClose} />, 'Đổi mật khẩu', '50%');
    };

    const handleCreatePassword = () => {
        modalRef.current?.onOpen(<CreatePassword onClose={modalRef.current?.onClose} />, 'Tạo mật khẩu', '50%');
    };

    return (
        <>
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
                    {authUser?.user?.hasPassword ? (
                        <MenuItem onClick={handleChangePassword}>Đổi mật khẩu</MenuItem>
                    ) : (
                        <MenuItem onClick={handleCreatePassword}>Tạo mật khẩu</MenuItem>
                    )}
                    <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
                </MenuList>
            </Popover>
            <ModalBase ref={modalRef} />
        </>
    );
};

export default AccountPopover;
