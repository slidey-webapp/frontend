import { CssBaseline, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminLayoutConstant } from '~/configs/constants';
import { createTheme } from '~/themes';
import SideNav from './SideNav';
import TopNav from './TopNav';

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    height: `calc(100% - ${AdminLayoutConstant.TOP_NAV_HEIGHT}px)`,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: AdminLayoutConstant.SIDE_NAV_WIDTH,
    },
}));

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
});

interface Props {}

const AdminLayout: React.FC<Props> = props => {
    const [openNav, setOpenNav] = useState(false);
    const theme = createTheme();

    const handlePathnameChange = useCallback(() => {
        if (openNav) {
            setOpenNav(false);
        }
    }, [openNav]);

    useEffect(() => {
        handlePathnameChange();
    }, [location.pathname]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div style={{ height: '100%' }}>
                <TopNav onNavOpen={() => setOpenNav(true)} />
                <SideNav onClose={() => setOpenNav(false)} open={openNav} />
                <LayoutRoot className="hasidhasida">
                    <LayoutContainer>
                        <Outlet />
                    </LayoutContainer>
                </LayoutRoot>
            </div>
        </ThemeProvider>
    );
};

export default AdminLayout;
