import React, { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { RootState, useAppSelector } from '~/AppStore';
import { FORGOT_PASSWORD_API } from '~/configs/global.api';
import { requestApi } from '~/libs/axios';
import NotifyUtil from '~/utils/NotifyUtil';
import { ButtonBase } from '../buttons/ButtonBase';
import BaseForm from '../forms/BaseForm';
import BaseIcon from '../icons/BaseIcon';
import Overlay, { OverlayRef } from '../loadings/Overlay';

interface Props {}

const ForgotPassword: React.FC<Props> = () => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const overlayRef = useRef<OverlayRef>(null);

    const [emailSent, setEmailSent] = useState<string>('');

    const handleSubmit = async (formValues: { email: string }) => {
        overlayRef.current?.open();

        const response = await requestApi('post', FORGOT_PASSWORD_API, formValues);
        overlayRef.current?.close();

        if (response.status === 200) {
            setEmailSent(formValues.email);
            return;
        }

        NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra!');
    };

    const renderBody = () => {
        if (isAuthenticated) return <Navigate to={'/'} />;
        let body = null;
        if (emailSent) {
            body = (
                <div className="w-full h-full flex flex-col items-center justify-center text-sm">
                    <div className="flex items-center">
                        <BaseIcon type="forward-to-inbox-outlined" style={{ fontSize: 72 }} />
                    </div>
                    <div className="mt-6">
                        <div className="text-center">Liên kết đặt lại mật khẩu đã gửi đến email</div>
                        <div className="text-center text-[#6366F1]">{emailSent}</div>
                        <div className="text-center">Vui lòng kiểm tra email.</div>
                    </div>
                    <div className="w-full mt-6 flex items-center justify-end">
                        <ButtonBase
                            className="w-full h-10 flex items-center"
                            title="Trở về đăng nhập"
                            onClick={() => navigate('/login')}
                        />
                    </div>
                </div>
            );
        } else {
            body = (
                <BaseForm
                    onSubmit={handleSubmit}
                    fields={[
                        {
                            name: 'email',
                            classNameCol: 'col-span-12',
                            label: 'Nhập email để đặt lại mật khẩu',
                            type: 'email',
                            required: true,
                        },
                    ]}
                    buttons={{
                        submitButton: (
                            <ButtonBase className="w-full h-10 flex items-center" type="submit" title="Gửi" />
                        ),
                    }}
                />
            );
        }

        return (
            <div className="w-full h-screen relative flex items-center justify-center" key="login">
                <div className="w-[440px] bg-white rounded-md shadow p-5 flex flex-col">
                    <div className="text-orange-400 font-bold text-xl mb-5">Đặt lại mật khẩu</div>
                    {body}
                </div>
            </div>
        );
    };

    return (
        <>
            {renderBody()}
            <Overlay ref={overlayRef} />
        </>
    );
};

export default ForgotPassword;
