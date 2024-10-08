import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayoutConstant } from '~/configs/constants';
import SideNav from './SideNav';
import TopNav from './TopNav';

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    height: `calc(100% - ${DashboardLayoutConstant.TOP_NAV_HEIGHT}px)`,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: DashboardLayoutConstant.SIDE_NAV_WIDTH,
    },
}));

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
});

interface Props {}

const DashboardLayout: React.FC<Props> = () => {
    const [openNav, setOpenNav] = useState(false);
    // const theme = createTheme();

    const handlePathnameChange = useCallback(() => {
        if (openNav) {
            setOpenNav(false);
        }
    }, [openNav]);

    useEffect(() => {
        handlePathnameChange();
    }, [location.pathname]);

    return (
        <div style={{ height: '100%' }}>
            <TopNav onNavOpen={() => setOpenNav(true)} />
            <SideNav onClose={() => setOpenNav(false)} open={openNav} />
            <LayoutRoot className="">
                <LayoutContainer>
                    <Outlet />
                </LayoutContainer>
            </LayoutRoot>
        </div>
    );
};

export default DashboardLayout;
