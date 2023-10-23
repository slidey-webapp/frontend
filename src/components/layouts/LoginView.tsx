import { Divider } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import React, { useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '~/AppStore';
import { loginAsync } from '~/store/authSlice';
import { LoginParam, LoginType } from '~/types/auth';
import NotifyUtil from '~/utils/NotifyUtil';
import { ButtonBase } from '../buttons/ButtonBase';
import BaseForm from '../forms/BaseForm';
import Overlay, { OverlayRef } from '../loadings/Overlay';

const LoginView: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const overlayRef = useRef<OverlayRef>(null);

    const handleLogin = async (type: LoginType, params: LoginParam | { token: string }) => {
        overlayRef.current?.open();
        dispatch(
            loginAsync(
                {
                    type,
                    params,
                },
                () => {
                    if (location.pathname.includes('login')) navigate('/');
                },
                overlayRef.current?.close,
            ),
        );
    };

    if (isAuthenticated) return <Navigate to={'/'} />;
    return (
        <div className="w-full h-screen relative flex items-center justify-center" key="login">
            <div className="w-[440px] bg-white rounded-md shadow p-5 flex flex-col">
                <div className="text-orange-400 font-bold text-xl mb-5">Đăng nhập</div>
                <BaseForm
                    onSubmit={formValues => handleLogin('login', formValues)}
                    fields={[
                        {
                            name: nameof.full<LoginParam>(x => x.email),
                            classNameCol: 'col-span-12',
                            label: 'Email',
                            type: 'email',
                            required: true,
                        },
                        {
                            name: nameof.full<LoginParam>(x => x.password),
                            classNameCol: 'col-span-12',
                            label: 'Mật khẩu',
                            type: 'password',
                            required: true,
                        },
                    ]}
                    buttons={{
                        submitButton: (
                            <ButtonBase
                                className="w-full h-10 flex items-center !m-0"
                                size="sm"
                                type="submit"
                                variant="primary"
                                title="Đăng nhập"
                            />
                        ),
                    }}
                />
                <Divider textAlign="center" className="!my-3 text-gray-400 text-13px">
                    Hoặc
                </Divider>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        const token = credentialResponse.credential as string;
                        handleLogin('google-login', { token });
                    }}
                    onError={() => {
                        NotifyUtil.error('Đăng nhập thất bại');
                    }}
                    text="continue_with"
                    width={400}
                    containerProps={{
                        className: 'google-login-button',
                    }}
                />
                <div className="flex items-center text-gray-400 mt-3 w-full justify-center text-13px">
                    Bạn chưa có tài khoản?
                    <Link to="/register" className="ml-1.5 text-blue-500 hover:underline">
                        Đăng ký
                    </Link>
                </div>
            </div>
            <Overlay ref={overlayRef} />
        </div>
    );
};

export default LoginView;
