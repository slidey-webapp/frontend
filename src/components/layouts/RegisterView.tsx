import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from '~/AppStore';
import { SIGN_UP_API } from '~/configs/global.api';
import happyImage from '~/images/login/happy.jpg';
import { requestApi } from '~/libs/axios';
import { SignUpParam } from '~/types/auth';
import NotifyUtil from '~/utils/NotifyUtil';
import { ButtonBase } from '../buttons/ButtonBase';
import BaseForm from '../forms/BaseForm';
import { Link, RouteObject, useRoutes } from 'react-router-dom';

const RegisterView: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const handleSubmit = async (formValues: SignUpParam) => {
        const response = await requestApi('post', SIGN_UP_API, formValues);
        if (response.status === 200) {
            NotifyUtil.success('Đăng ký tài khoản thành công!');
            navigate('/login');
        } else {
            NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra!');
        }
    };

    if (isAuthenticated) return <Navigate to={'/'} />;
    return (
        <div className="w-full h-screen relative flex items-center justify-center" key="register">
            <div className="w-[380px] min-h-[350px] bg-white rounded-md shadow p-3 pt-0 flex flex-col">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[#ffba00] font-bold text-xl">Đăng ký</div>
                        <div className="text-[#9b9b9b] font-md">Chào mừng bạn</div>
                        <Link to="/login">Login</Link>
                    </div>
                    <div>
                        <img src={happyImage} width={200} alt="" />
                    </div>
                </div>
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
                        submitButton: <ButtonBase type="submit" variant="primary" title="Đăng ký" />,
                    }}
                />
            </div>
        </div>
    );
};

export default RegisterView;
