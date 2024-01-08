import React, { useRef } from 'react';
import { useAppDispatch } from '~/AppStore';
import { CREATE_PASSWORD_API } from '~/configs/global.api';
import { requestApi } from '~/libs/axios';
import { logoutAsync } from '~/store/authSlice';
import { CreatePasswordParam } from '~/types/auth';
import NotifyUtil from '~/utils/NotifyUtil';
import { ButtonBase } from '../buttons/ButtonBase';
import BaseForm, { BaseFormRef } from '../forms/BaseForm';

interface Props {
    onClose: () => void;
}

const CreatePassword: React.FC<Props> = ({ onClose }) => {
    const dispatch = useAppDispatch();

    const formRef = useRef<BaseFormRef>(null);

    const handleSubmit = async (formValues: CreatePasswordParam) => {
        if (formValues.confirmPassword !== formValues.password) {
            NotifyUtil.error('Mật khẩu nhập lại không khớp');

            return;
        }

        formRef.current?.mask();

        const response = await requestApi('post', CREATE_PASSWORD_API, formValues);
        if (response.status === 200) {
            NotifyUtil.success('Tạo mật khẩu thành công!');
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
                    name: nameof.full<CreatePasswordParam>(x => x.password),
                    classNameCol: 'col-span-12',
                    label: 'Mật khẩu mới',
                    type: 'password',
                    required: true,
                },
                {
                    name: nameof.full<CreatePasswordParam>(x => x.confirmPassword),
                    classNameCol: 'col-span-12',
                    label: 'Xác nhận mật khẩu mới',
                    type: 'password',
                    required: true,
                },
            ]}
            buttons={{
                closeButton: (
                    <ButtonBase title="Đóng" startIcon="close" color="secondary" onClick={onClose} className="!mx-1" />
                ),
                submitButton: <ButtonBase type="submit" title="Lưu" startIcon="save" className="!mx-1" />,
            }}
        />
    );
};

export default CreatePassword;
