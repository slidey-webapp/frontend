import { Avatar, Badge, Box, IconButton, Stack, SvgIcon, Tooltip, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import AccountPopover from './AccountPopover';
import { usePopover } from '~/hooks/usePopover';
import { DashboardLayoutConstant } from '~/configs/constants';
import BaseIcon from '~/components/icons/BaseIcon';

interface Props {
    onNavOpen: () => void;
}

const TopNav: React.FC<Props> = ({ onNavOpen }) => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const accountPopover = usePopover();

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
                        <Avatar
                            onClick={accountPopover.handleOpen}
                            ref={accountPopover.anchorRef}
                            sx={{
                                cursor: 'pointer',
                                height: 40,
                                width: 40,
                            }}
                            //todo: avatar src
                            src={undefined}
                        />
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
