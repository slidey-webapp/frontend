import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Scrollbar from '~/components/scrollbar/Scrollbar';
import logo from '~/images/logo.png';
import { filterRoutesWithPermissions, routeList } from '~/routes/AppRoute';
import SideNavItem from './SideNavItem';

interface Props {
    open: boolean;
    onClose?: () => void;
}

const SideNav: React.FC<Props> = ({ open, onClose }) => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

    const dashboardRoutes = routeList.filter(x => x.layout === 'dashboard');
    const filteredRoutes = filterRoutesWithPermissions(dashboardRoutes);

    const content = (
        <Scrollbar
            sx={{
                height: '100%',
                '& .simplebar-content': {
                    height: '100%',
                },
                '& .simplebar-scrollbar:before': {
                    background: 'neutral.500',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Box sx={{ py: 3, px: 4 }}>
                    <Box component={Link} to="/" className="flex items-center justify-center">
                        <img
                            src={logo}
                            alt="logo"
                            className=""
                            style={{
                                height: 40,
                            }}
                        />
                    </Box>
                </Box>
                {filteredRoutes.map(item => (
                    <SideNavItem key={item.path} routeDefinition={item} />
                ))}
            </Box>
        </Scrollbar>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.700',
                        color: 'neutral.400',
                        width: 280,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.700',
                    color: 'neutral.400',
                    width: 280,
                },
            }}
            sx={{ zIndex: theme => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};

export default SideNav;
