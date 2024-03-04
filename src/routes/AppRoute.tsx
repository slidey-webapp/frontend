import React, { Suspense } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { BaseIconProps } from '~/components/icons/BaseIcon';
import SessionDetailPage from '~/pages/sessions/SessionDetailPage';

const NotFound = React.lazy(() => import('~/components/errors/NotFound'));
const LoginView = React.lazy(() => import('~/components/layouts/LoginView'));
const RegisterView = React.lazy(() => import('~/components/layouts/RegisterView'));
const ForgotPassword = React.lazy(() => import('~/components/layouts/ForgotPassword'));
const JoinGroup = React.lazy(() => import('~/pages/groups/JoinGroup'));
const JoinPresentation = React.lazy(() => import('~/pages/presentations/JoinPresentation'));

const LandingPage = React.lazy(() => import('~/pages/landings/LandingPage'));

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

// #region session
const SessionDashboardPage = React.lazy(() => import('~/pages/sessions/SessionDashboardPage'));

// #endregion

// #region template
const TemplatePage = React.lazy(() => import('~/pages/templates/TemplatePage'));
const TemplateCreatePage = React.lazy(() => import('~/pages/templates/TemplateCreatePage'));
// #endregion

export type RouteDefinition = Omit<RouteObject, 'children'> & {
    title: string;
    hideTitle?: boolean;
    hideBreadcrumb?: boolean;
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
            <Suspense>
                <LandingPage />
            </Suspense>
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
        title: 'Tham bài trình chiếu bằng liên kết',
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
        title: 'Trang chủ',
        hideTitle: true,
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
                title: 'Trang chủ',
                path: 'home',
                element: (
                    <Suspense>
                        <DashboardHomePage />
                    </Suspense>
                ),
                icon: 'dashboard-outlined',
                divider: true,
                hideBreadcrumb: true,
            },
            {
                title: 'Quản lý nhóm',
                path: 'group',
                children: [
                    {
                        hide: true,
                        path: '',
                        title: 'Quản lý nhóm',
                        hideBreadcrumb: true,
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
                icon: 'groups-outlined',
            },
            {
                title: 'Bài trình chiếu của tôi',
                path: 'presentation',
                children: [
                    {
                        hide: true,
                        path: '',
                        hideBreadcrumb: true,
                        title: 'Bài trình chiếu của tôi',
                        element: (
                            <Suspense>
                                <PresentationPage />
                            </Suspense>
                        ),
                    },
                ],
                icon: 'presentation-outlined',
            },
            {
                title: 'Phiên trình chiếu của tôi',
                path: 'present-session',
                icon: 'slide-outlined',
                divider: true,
                children: [
                    {
                        title: 'Phiên trình chiếu của tôi',
                        path: '',
                        hide: true,
                        hideBreadcrumb: true,
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
            {
                title: 'Tất cả mẫu',
                path: 'template',
                icon: 'collections-outlined',
                children: [
                    {
                        title: '',
                        path: '',
                        hide: true,
                        hideBreadcrumb: true,
                        element: (
                            <Suspense>
                                <TemplatePage />
                            </Suspense>
                        ),
                    },
                    
                ],
            },
        ],
    },
    {
        title: 'Chi tiết bài trình chiếu',
        path: '/presentation/edit/:presentationID',
        element: (
            <Suspense>
                <PresentationDetailPage />
            </Suspense>
        ),
    },
    {
        title: 'Trình chiếu bài trình chiếu',
        path: '/presentation/show/:sessionID',
        element: (
            <Suspense>
                <PresentationHostShow />
            </Suspense>
        ),
    },
    {
        title: 'Tạo mẫu',
        path: '/template/create',
        element: (
            <Suspense>
                <TemplateCreatePage />
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
        element: <NotFound />,
    },
];

const AppRoute: React.FC = () => {
    // @ts-ignore
    const elements = useRoutes(routeList);
    return <>{elements}</>;
};

export default AppRoute;
