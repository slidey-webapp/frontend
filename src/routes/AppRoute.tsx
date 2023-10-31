import React, { Suspense } from 'react';
import { Link, RouteObject, useRoutes } from 'react-router-dom';

const LoginView = React.lazy(() => import('~/components/layouts/LoginView'));
const RegisterView = React.lazy(() => import('~/components/layouts/RegisterView'));

// #region Dashboard
const DashboardLayout = React.lazy(() => import('~/components/layouts/dashboard/DashboardLayout'));
const GroupPage = React.lazy(() => import('~/pages/dashboards/groups/GroupPage'));

// #endregion


// #region example
const ExampleGrid = React.lazy(() => import('~/pages/examples/grids/ExampleGrid'));
// #endregion

const routeList = [
    {
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
        path: '/login',
        element: (
            <Suspense>
                <LoginView />
            </Suspense>
        ),
    },
    {
        path: '/register',
        element: (
            <Suspense>
                <RegisterView />
            </Suspense>
        ),
    },
    {
        path: '/dashboard',
        element: (
            <Suspense>
                <DashboardLayout />
            </Suspense>
        ),
        children: [
            {
                path: 'group',
                element: (
                    <Suspense>
                        <GroupPage />
                    </Suspense>
                ),
            },
            {
                path: 'grid',
                element: (
                    <Suspense>
                        <ExampleGrid />
                    </Suspense>
                ),
            },
            {
                path: 'form',
                element: (
                    <Suspense>
                        {/* //todo: example form */}
                        Example form
                    </Suspense>
                ),
            },
            {
                path: 'external',
                element: (
                    <Suspense>
                        Example External
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '/*',
        element: <div>notfound</div>,
    },
] as RouteObject[];

const AppRoute: React.FC = () => {
    const elements = useRoutes(routeList);
    return <>{elements}</>;
};

export default AppRoute;
