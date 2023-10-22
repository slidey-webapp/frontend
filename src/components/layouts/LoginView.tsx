import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '~/AppStore';
import happyImage from '~/images/login/happy.jpg';
import { loginAsync } from '~/store/authSlice';
import { LoginParam } from '~/types/auth';
import { ButtonBase } from '../buttons/ButtonBase';
import BaseForm from '../forms/BaseForm';

const LoginView: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (formValues: LoginParam) => {
        console.log(formValues)
        dispatch(
            loginAsync(formValues, () => {
                if (location.pathname.includes('login')) navigate('/');
            }),
        );
    };

    if (isAuthenticated) return <Navigate to={'/'} />;
    return (
        <div className="w-full h-screen relative flex items-center justify-center" key="login">
            <div className="w-[380px] min-h-[350px] bg-white rounded-md shadow p-3 pt-0 flex flex-col">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[#ffba00] font-bold text-xl">Đăng nhập</div>
                        <div className="text-[#9b9b9b] font-md">Chào bạn quay lại</div>
                        <Link to="/register">Đăng ký</Link>
                    </div>
                    <div>
                        <img src={happyImage} width={200} alt="" />
                    </div>
                </div>
                <BaseForm
                    onSubmit={handleSubmit}
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
                        submitButton: <ButtonBase type="submit" variant="primary" title="Đăng nhập" />,
                    }}
                />
            </div>
        </div>
    );
};

export default LoginView;
