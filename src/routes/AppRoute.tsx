import React, { Suspense } from 'react';
import { Link, RouteObject, useRoutes } from 'react-router-dom';
import { BaseIconProps } from '~/components/icons/BaseIcon';

const LoginView = React.lazy(() => import('~/components/layouts/LoginView'));
const RegisterView = React.lazy(() => import('~/components/layouts/RegisterView'));

// #region Dashboard
const DashboardLayout = React.lazy(() => import('~/components/layouts/dashboard/DashboardLayout'));
const GroupPage = React.lazy(() => import('~/pages/dashboards/groups/GroupPage'));

// #endregion

// #region example
const ExampleGrid = React.lazy(() => import('~/pages/examples/grids/ExampleGrid'));
// #endregion

type RouteDefinition = Omit<RouteObject, 'children'> & {
    title: string;
    disabled?: boolean;
    external?: boolean;
    path: string;
    icon?: BaseIconProps['type'];
    children?: RouteDefinition[];
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
        title: 'Dashboard',
        path: '/dashboard',
        element: (
            <Suspense>
                <DashboardLayout />
            </Suspense>
        ),
        children: [
            {
                title: 'Quản lý nhóm',
                path: 'group',
                element: (
                    <Suspense>
                        <GroupPage />
                    </Suspense>
                ),
                children: [
                    {
                        title: 'Chi tiết quản lý nhóm',
                        path: ':groupId',
                        element: (
                            <Suspense>
                                <GroupPage />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                title: 'Example grid',
                path: 'grid',
                element: (
                    <Suspense>
                        <ExampleGrid />
                    </Suspense>
                ),
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
            },
            {
                title: 'Example external side menu',
                path: 'external',
                element: <Suspense>Example External</Suspense>,
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
