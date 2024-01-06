import React, { useRef } from 'react';
import { useAppDispatch } from '~/AppStore';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseForm, { BaseFormRef } from '~/components/forms/BaseForm';
import { CHANGE_PASSWORD_API } from '~/configs/global.api';
import { requestApi } from '~/libs/axios';
import { logoutAsync } from '~/store/authSlice';
import { ChangePasswordParam } from '~/types/auth';
import NotifyUtil from '~/utils/NotifyUtil';

interface Props {
    onClose: () => void;
}

const ChangePassword: React.FC<Props> = ({ onClose }) => {
    const dispatch = useAppDispatch();

    const formRef = useRef<BaseFormRef>(null);

    const handleSubmit = async (formValues: ChangePasswordParam) => {
        if (formValues.confirmNewPassword !== formValues.newPassword) {
            NotifyUtil.error('Mật khẩu mới nhập lại không khớp');

            return;
        }

        formRef.current?.mask();

        const response = await requestApi('post', CHANGE_PASSWORD_API, formValues);
        if (response.status === 200) {
            NotifyUtil.success('Đổi mật khẩu thành công!');
            dispatch(logoutAsync(() => null, false));
            onClose();
        } else {
            NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra!');
        }

        formRef.current?.unmask();
    };

    return (
        <BaseForm
            ref={formRef}
            onSubmit={handleSubmit}
            fields={[
                {
                    name: nameof.full<ChangePasswordParam>(x => x.password),
                    classNameCol: 'col-span-12',
                    label: 'Mật khẩu cũ',
                    type: 'password',
                    required: true,
                },
                {
                    name: nameof.full<ChangePasswordParam>(x => x.newPassword),
                    classNameCol: 'col-span-12',
                    label: 'Mật khẩu mới',
                    type: 'password',
                    required: true,
                },
                {
                    name: nameof.full<ChangePasswordParam>(x => x.confirmNewPassword),
                    classNameCol: 'col-span-12',
                    label: 'Xác nhận mật khẩu mới',
                    type: 'password',
                    required: true,
                },
            ]}
            buttons={{
                closeButton: <ButtonBase title="Đóng" startIcon="close" color="secondary" onClick={onClose} />,
                submitButton: <ButtonBase type="submit" title="Lưu" startIcon="save" />,
            }}
        />
    );
};

export default ChangePassword;
