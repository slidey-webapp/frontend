import React, { Suspense } from 'react';
import { Link, Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { BaseIconProps } from '~/components/icons/BaseIcon';
import SessionDetailPage from '~/pages/sessions/SessionDetailPage';

const LoginView = React.lazy(() => import('~/components/layouts/LoginView'));
const RegisterView = React.lazy(() => import('~/components/layouts/RegisterView'));
const ForgotPassword = React.lazy(() => import('~/components/layouts/ForgotPassword'));
const JoinGroup = React.lazy(() => import('~/pages/groups/JoinGroup'));
const JoinPresentation = React.lazy(() => import('~/pages/presentations/JoinPresentation'));

// #region Dashboard
const DashboardLayout = React.lazy(() => import('~/components/layouts/dashboard/DashboardLayout'));
const DashboardHomePage = React.lazy(() => import('~/pages/home/DashboardHomePage'));
const GroupPage = React.lazy(() => import('~/pages/groups/GroupPage'));
const GroupDetailPage = React.lazy(() => import('~/pages/groups/GroupDetailPage'));
// #endregion

// #region presentation
const PresentationPage = React.lazy(() => import('~/pages/presentations/PresentationPage'));
const PresentationDetailPage = React.lazy(() => import('~/pages/presentations/PresentationDetailPage'));
const PresentationHostShow = React.lazy(() => import('~/pages/presentations/PresentationHostShow'));
const PresentationJoinSession = React.lazy(() => import('~/pages/presentations/PresentationJoinSession'));
// #endregion

// #region presentation
const SessionDashboardPage = React.lazy(() => import('~/pages/sessions/SessionDashboardPage'));

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
        title: 'Tham nhóm bằng liên kết',
        hide: true,
        path: '/group/join/:token',
        element: (
            <Suspense>
                <JoinGroup />
            </Suspense>
        ),
    },
    {
        title: 'Tham bài thuyết trình bằng liên kết',
        hide: true,
        path: '/presentation/collab/join/:token',
        element: (
            <Suspense>
                <JoinPresentation />
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
                title: 'Bài thuyết trình của tôi',
                path: 'presentation',
                children: [
                    {
                        hide: true,
                        path: '',
                        title: 'Bài thuyết trình của tôi',
                        element: (
                            <Suspense>
                                <PresentationPage />
                            </Suspense>
                        ),
                    },
                ],
                icon: 'list',
            },
            {
                title: 'Phiên trình chiếu của tôi',
                path: 'present-session',

                icon: 'list',
                children: [
                    {
                        title: 'Phiên trình chiếu của tôi',
                        path: '',
                        hide: true,
                        element: (
                            <Suspense>
                                <SessionDashboardPage />
                            </Suspense>
                        ),
                    },
                    {
                        title: 'Chi tiết phiên trình chiếu',
                        path: ':sessionID',
                        hide: true,
                        element: (
                            <Suspense>
                                <SessionDetailPage />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
    {
        title: 'Chi tiết bài thuyết trình',
        path: '/presentation/edit/:presentationID',
        element: (
            <Suspense>
                <PresentationDetailPage />
            </Suspense>
        ),
    },
    {
        title: 'Trình chiếu bài thuyết trình',
        path: '/presentation/show/:sessionID',
        element: (
            <Suspense>
                <PresentationHostShow />
            </Suspense>
        ),
    },

    {
        title: 'Tham gia phiên trình chiếu',
        path: 'join/:code',
        element: (
            <Suspense>
                <PresentationJoinSession />
            </Suspense>
        ),
    },
    {
        title: 'Tham gia phiên trình chiếu',
        path: 'join',
        element: (
            <Suspense>
                <PresentationJoinSession />
            </Suspense>
        ),
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
