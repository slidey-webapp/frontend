import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RootState, useAppSelector } from '~/AppStore';
import LoginView from '~/components/layouts/LoginView';
import RegisterView from '~/components/layouts/RegisterView';
import { fetchAuthDataAsync } from '~/store/authSlice';

type Props = {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
    const dispatch = useDispatch();

    const { loading, isAuthenticated, checkLoginLoading, authUser } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchAuthDataAsync());
    }, []);

    if (checkLoginLoading) return <>Loading...</>;
    if (!isAuthenticated) {
        const pathName = location.pathname;
        if (pathName.includes('register')) {
            return <RegisterView />;
        }

        return <LoginView />;
    }

    return <>{children}</>;
};
