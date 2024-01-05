import React, { useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { RootState, useAppSelector } from '~/AppStore';
import { RESET_PASSWORD_API } from '~/configs/global.api';
import { requestApi } from '~/libs/axios';
import { ResetPasswordParam } from '~/types/auth';
import NotifyUtil from '~/utils/NotifyUtil';
import { ButtonBase } from '../buttons/ButtonBase';
import BaseForm from '../forms/BaseForm';
import BaseIcon from '../icons/BaseIcon';
import Overlay, { OverlayRef } from '../loadings/Overlay';

interface Props {}

const ResetPassword: React.FC<Props> = () => {
    const { accountID, token } = useParams<ResetPasswordParam>();
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const [isReset, setIsReset] = useState<boolean>(false);

    const overlayRef = useRef<OverlayRef>(null);

    const handleSubmit = async (formValues: { password: string; confirmPassword: string }) => {
        if (formValues.password !== formValues.confirmPassword) {
            NotifyUtil.error('Mật khẩu mới nhập lại không khớp');

            return;
        }

        overlayRef.current?.open();
        const response = await requestApi('post', RESET_PASSWORD_API, {
            ...formValues,
            accountID,
            token,
        });
        overlayRef.current?.close();
        if (response.status === 200) {
            setIsReset(true);
            return;
        }
        NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra!');
    };

    const renderBody = () => {
        if (isAuthenticated) return <Navigate to={'/'} />;
        let body = null;
        if (isReset) {
            body = (
                <div className="w-full h-full flex flex-col items-center justify-center text-sm">
                    <div className="flex items-center">
                        <BaseIcon type="lock-reset" style={{ fontSize: 72, color: '#10B981' }} />
                    </div>
                    <div className="mt-6">
                        <div className="text-center">Đổi mật khẩu thành công</div>
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
                            name: 'password',
                            classNameCol: 'col-span-12',
                            label: 'Mật khẩu mới',
                            type: 'password',
                            required: true,
                        },
                        {
                            name: 'confirmPassword',
                            classNameCol: 'col-span-12',
                            label: 'Xác nhận mật khẩu mới',
                            type: 'password',
                            required: true,
                        },
                    ]}
                    buttons={{
                        submitButton: (
                            <ButtonBase className="w-full h-10 flex items-center" type="submit" title="Đổi mật khẩu" />
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

export default ResetPassword;
