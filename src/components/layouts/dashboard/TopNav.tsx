import { Badge, Box, IconButton, Stack, SvgIcon, Tooltip, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { RootState, useAppSelector } from '~/AppStore';
import BaseIcon from '~/components/icons/BaseIcon';
import { DashboardLayoutConstant } from '~/configs/constants';
import { usePopover } from '~/hooks/usePopover';
import ComponentUtil from '~/utils/ComponentUtil';
import AccountPopover from './AccountPopover';

interface Props {
    onNavOpen: () => void;
}

const TopNav: React.FC<Props> = ({ onNavOpen }) => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const accountPopover = usePopover();
    const { authUser } = useAppSelector((state: RootState) => state.auth);

    return (
        <>
            <Box
                component="header"
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
                    position: 'sticky',
                    left: {
                        lg: `${DashboardLayoutConstant.SIDE_NAV_WIDTH}px`,
                    },
                    top: 0,
                    width: {
                        lg: `calc(100% - ${DashboardLayoutConstant.SIDE_NAV_WIDTH}px)`,
                    },
                    zIndex: theme => theme.zIndex.appBar,
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        minHeight: DashboardLayoutConstant.TOP_NAV_HEIGHT,
                        px: 2,
                    }}
                >
                    <Stack alignItems="center" direction="row" spacing={2}>
                        {!lgUp && (
                            <IconButton onClick={onNavOpen}>
                                <BaseIcon type="menu" size={24} />
                            </IconButton>
                        )}
                        <Tooltip title="Search">
                            <IconButton>
                                <BaseIcon type="search" size={24} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Stack alignItems="center" direction="row" spacing={2}>
                        <Tooltip title="Contacts">
                            <IconButton>
                                <SvgIcon fontSize="small">
                                    <BaseIcon type="users" size={24} />
                                </SvgIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Notifications">
                            <IconButton>
                                <Badge badgeContent={4} color="success" variant="dot">
                                    <SvgIcon fontSize="small">
                                        <BaseIcon type="bell" size={24} />
                                    </SvgIcon>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        {authUser?.user && (
                            <div
                                className="cursor-pointer w-fit h-fit rounded-full"
                                onClick={accountPopover.handleOpen}
                                ref={accountPopover.anchorRef}
                            >
                                {ComponentUtil.renderAvatarUser({
                                    fullName: authUser?.user?.fullname,
                                    size: 40,
                                })}
                            </div>
                        )}
                    </Stack>
                </Stack>
            </Box>
            <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
            />
        </>
    );
};

export default TopNav;
