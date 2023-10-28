import { Divider } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import React, { useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '~/AppStore';
import { SIGN_UP_API } from '~/configs/global.api';
import { requestApi } from '~/libs/axios';
import { loginAsync } from '~/store/authSlice';
import { LoginParam, LoginType, SignUpParam } from '~/types/auth';
import NotifyUtil from '~/utils/NotifyUtil';
import { ButtonBase } from '../buttons/ButtonBase';
import BaseForm from '../forms/BaseForm';
import Overlay, { OverlayRef } from '../loadings/Overlay';

const RegisterView: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const overlayRef = useRef<OverlayRef>(null);
    const dispatch = useAppDispatch();

    const handleSubmit = async (formValues: SignUpParam) => {
        overlayRef.current?.open()
        const response = await requestApi('post', SIGN_UP_API, formValues);
        overlayRef.current?.close()
        if (response.status === 200) {
            NotifyUtil.success('Đăng ký tài khoản thành công. Vui lòng kiểm tra email để xác thực tài khoản!');
            navigate('/login');
        } else {
            NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra!');
        }
    };

    const handleLogin = async (type: LoginType, params: LoginParam | { token: string }) => {
        overlayRef.current?.open();
        dispatch(
            loginAsync(
                {
                    type,
                    params,
                },
                () => {
                    if (location.pathname.includes('register')) navigate('/');
                },
                overlayRef.current?.close,
            ),
        );
    };

    if (isAuthenticated) return <Navigate to={'/'} />;
    return (
        <div className="w-full h-screen relative flex items-center justify-center" key="register">
            <div className="w-[440px] bg-white rounded-md shadow p-5 flex flex-col">
                <div className="text-orange-400 font-bold text-xl mb-5">Đăng ký</div>
                <BaseForm
                    onSubmit={handleSubmit}
                    fields={[
                        {
                            name: nameof.full<SignUpParam>(x => x.email),
                            classNameCol: 'col-span-12',
                            label: 'Email',
                            type: 'email',
                            required: true,
                        },
                        {
                            name: nameof.full<SignUpParam>(x => x.fullname),
                            classNameCol: 'col-span-12',
                            label: 'Họ và tên',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: nameof.full<SignUpParam>(x => x.password),
                            classNameCol: 'col-span-12',
                            label: 'Mật khẩu',
                            type: 'password',
                            required: true,
                        },
                        {
                            name: nameof.full<SignUpParam>(x => x.confirmPassword),
                            classNameCol: 'col-span-12',
                            label: 'Xác nhận mật khẩu',
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
                                title="Đăng ký"
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
                        // @ts-ignore
                        handleLogin('google-login', { token, email: 'abs', fullname: 'abc' });
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
                    Bạn đã có tài khoản?
                    <Link to="/login" className="ml-1.5 text-blue-500 hover:underline">
                        Đăng nhập
                    </Link>
                </div>
            </div>
            <Overlay ref={overlayRef} />
        </div>
    );
};

export default RegisterView;
