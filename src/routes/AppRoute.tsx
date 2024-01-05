import React, { Suspense } from 'react';
import { Link, Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { BaseIconProps } from '~/components/icons/BaseIcon';

const LoginView = React.lazy(() => import('~/components/layouts/LoginView'));
const RegisterView = React.lazy(() => import('~/components/layouts/RegisterView'));
const ForgotPassword = React.lazy(() => import('~/components/layouts/ForgotPassword'));

// #region Dashboard
const DashboardLayout = React.lazy(() => import('~/components/layouts/dashboard/DashboardLayout'));
const DashboardHomePage = React.lazy(() => import('~/pages/dashboards/home/DashboardHomePage'));
const GroupPage = React.lazy(() => import('~/pages/dashboards/groups/GroupPage'));
const GroupDetailPage = React.lazy(() => import('~/pages/dashboards/groups/GroupDetailPage'));
// #endregion

// #region example
const ExampleGrid = React.lazy(() => import('~/pages/examples/grids/ExampleGrid'));
// #endregion

export type RouteDefinition = Omit<RouteObject, 'children'> & {
    title: string;
    disabled?: boolean;
    external?: boolean;
    path: string;
    icon?: BaseIconProps['type'];
    children?: RouteDefinition[];
    layout?: 'dashboard'; // todo: add more;
    group?: boolean;
    divider?: boolean;
    hide?: boolean;
    permission?: string[]; //todo: check permission later
};

export const routeList: RouteDefinition[] = [
    {
        title: 'Trang chủ',
        path: '/',
        element: (
            <>
                <Link to="/dashboard">Example admin page</Link>
                <Link to="/dashboard/grid">Example grid</Link>
                <Link to="/dashboard/form">Example form</Link>
            </>
        ),
    },
    {
        title: 'Đăng nhập',
        path: '/login',
        element: (
            <Suspense>
                <LoginView />
            </Suspense>
        ),
    },
    {
        title: 'Đăng ký',
        path: '/register',
        element: (
            <Suspense>
                <RegisterView />
            </Suspense>
        ),
    },
    {
        title: 'Đặt lại mật khẩu',
        path: '/forgot-password',
        element: (
            <Suspense>
                <ForgotPassword />
            </Suspense>
        ),
    },
    {
        title: 'Dashboard',
        path: '/dashboard',
        element: (
            <Suspense>
                <DashboardLayout />
            </Suspense>
        ),
        icon: 'add',
        layout: 'dashboard',
        group: true,
        divider: true,
        children: [
            {
                title: '',
                path: '',
                hide: true,
                element: <Navigate to="home" />,
            },
            {
                title: 'Tổng quan',
                path: 'home',
                element: (
                    <Suspense>
                        <DashboardHomePage />
                    </Suspense>
                ),
                icon: 'home',
                divider: true,
            },
            {
                title: 'Quản lý nhóm',
                path: 'group',
                children: [
                    {
                        hide: true,
                        path: '',
                        title: 'Quản lý nhóm',
                        element: (
                            <Suspense>
                                <GroupPage />
                            </Suspense>
                        ),
                    },
                    {
                        hide: true,
                        title: 'Chi tiết quản lý nhóm',
                        path: ':groupID',
                        element: (
                            <Suspense>
                                <GroupDetailPage />
                            </Suspense>
                        ),
                    },
                ],
                icon: 'list',
            },
            {
                title: 'Example grid',
                path: 'grid',
                element: (
                    <Suspense>
                        <ExampleGrid />
                    </Suspense>
                ),
                icon: 'list',
            },
            {
                title: 'Example form',
                path: 'form',
                element: (
                    <Suspense>
                        {/* //todo: example form */}
                        Example form
                    </Suspense>
                ),
                icon: 'list',
            },
            {
                title: 'Example external side menu',
                path: 'external',
                element: <Suspense>Example External</Suspense>,
                icon: 'list',
            },
        ],
    },
    {
        title: 'Not found',
        path: '/*',
        element: <div>notfound</div>,
    },
];

const AppRoute: React.FC = () => {
    // @ts-ignore
    const elements = useRoutes(routeList);
    return <>{elements}</>;
};

export default AppRoute;
