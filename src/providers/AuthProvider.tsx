import * as React from 'react';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
import { RootState, useAppSelector } from '~/AppStore';
import Loading from '~/components/loadings/Loading';
import { fetchAuthDataAsync } from '~/store/authSlice';
const LoginView = React.lazy(() => import('~/components/layouts/LoginView'));
const RegisterView = React.lazy(() => import('~/components/layouts/RegisterView'));
const VerifyAccount = React.lazy(() => import('~/components/layouts/VerifyAccount'));


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
        path: '/account/:accountID/verify/:token',
        element: (
            <Suspense>
                <VerifyAccount />
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
