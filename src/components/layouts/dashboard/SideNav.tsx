import { Box, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import Scrollbar from '~/components/scrollbar/Scrollbar';
import ConfigItems from './Config';
import SideNavItem from './SideNavItem';

interface Props {
    open: boolean;
    onClose?: () => void;
}

const SideNav: React.FC<Props> = ({ open, onClose }) => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

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
                <Box sx={{ p: 3 }}>
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: 'inline-flex',
                            height: 32,
                            width: 32,
                        }}
                    >
                        logo
                    </Box>
                </Box>
                <Box
                    component="nav"
                    sx={{
                        flexGrow: 1,
                        px: 2,
                        py: 3,
                    }}
                >
                    <Stack
                        component="ul"
                        spacing={0.5}
                        sx={{
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                    >
                        {ConfigItems.map(item => {
                            return <SideNavItem key={item.path} {...item} />;
                        })}
                    </Stack>
                </Box>
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
