import * as React from 'react';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { RootState, useAppSelector } from '~/AppStore';
import Loading from '~/components/loadings/Loading';
import { fetchAuthDataAsync } from '~/store/authSlice';

const LoginView = React.lazy(() => import('~/components/layouts/LoginView'));
const RegisterView = React.lazy(() => import('~/components/layouts/RegisterView'));
const ForgotPassword = React.lazy(() => import('~/components/layouts/ForgotPassword'));

const VerifyAccount = React.lazy(() => import('~/components/layouts/VerifyAccount'));
const ResetPassword = React.lazy(() => import('~/components/layouts/ResetPassword'));

type Props = {
    children: React.ReactNode;
};

const authRouteList = [
    {
        path: '/register',
        element: (
            <Suspense>
                <RegisterView />
            </Suspense>
        ),
    },
    {
        path: '/forgot-password',
        element: (
            <Suspense>
                <ForgotPassword />
            </Suspense>
        ),
    },
    {
        path: '/account/:accountID/verify/:token',
        element: (
            <Suspense>
                <VerifyAccount />
            </Suspense>
        ),
    },
    {
        path: '/account/:accountID/reset-password/:token',
        element: (
            <Suspense>
                <ResetPassword />
            </Suspense>
        ),
    },
    {
        path: '/*',
        element: (
            <Suspense>
                <LoginView />
            </Suspense>
        ),
    },
];

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
    const dispatch = useDispatch();
    const elements = useRoutes(authRouteList);

    const { isAuthenticated, checkLoginLoading } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchAuthDataAsync());
    }, []);

    if (checkLoginLoading) return <Loading />;
    if (!isAuthenticated) return elements;
    return <>{children}</>;
};
