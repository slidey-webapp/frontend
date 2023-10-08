import React from 'react';
import { Navigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '~/AppStore';
import happyImage from '~/images/login/happy.jpg';
import { loginAsync } from '~/store/authSlice';
import { LoginParam } from '~/types/auth';
import { ButtonBase } from '../buttons/ButtonBase';
import BaseForm from '../forms/BaseForm';

const LoginView: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    const handleSubmit = async (formValues: LoginParam) => {
        dispatch(
            loginAsync(formValues, () => {
                console.log('login-success!!');
            }),
        );
    };

    if (!!isAuthenticated) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="w-full h-screen relative flex items-center justify-center">
            <div className="w-[380px] min-h-[350px] bg-white rounded-md shadow p-3 pt-0 flex flex-col">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[#ffba00] font-bold text-xl">Đăng nhập</div>
                        <div className="text-[#9b9b9b] font-md">Chào bạn quay lại</div>
                    </div>
                    <div>
                        <img src={happyImage} width={200} alt="" />
                    </div>
                </div>
                <BaseForm
                    initialValues={{
                        [nameof.full<LoginParam>(x => x.username)]: 'admin',
                        [nameof.full<LoginParam>(x => x.password)]: 'Slidey@123',
                    }}
                    onSubmit={handleSubmit}
                    fields={[
                        {
                            name: nameof.full<LoginParam>(x => x.username),
                            classNameCol: 'col-span-12',
                            label: 'Tên đăng nhập',
                            type: 'text',
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
