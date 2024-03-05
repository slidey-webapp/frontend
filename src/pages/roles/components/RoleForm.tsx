import { useRef } from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseForm, { BaseFormRef } from '~/components/forms/BaseForm';
import { requestApi } from '~/libs/axios';
import { BaseFormModalProps } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { ROLE_CREATE_API, ROLE_UPDATE_API } from '../api/role.api';
import { getRoleFields } from '../types/form-fields';
import { RoleCreateDto, RoleDto } from '../types/role';

interface Props extends BaseFormModalProps {
    rowData?: RoleDto;
}

const RoleForm: React.FC<Props> = ({ rowData, modalType, onClose, onSuccess }) => {
    const formRef = useRef<BaseFormRef>(null);

    const handleSubmit = async (formValues: RoleCreateDto) => {
        formRef.current?.mask();
        try {
            const url = modalType == 'create' ? ROLE_CREATE_API : ROLE_UPDATE_API;

            const response = await requestApi<RoleDto>('post', url, {
                ...formValues,
                roleID: rowData?.roleID,
            });
            if (response?.status === 200 || response?.status === 400) {
                if (response.status === 200) {
                    onSuccess();
                } else {
                    NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra');
                }
            }
        } catch (err) {
            console.log('err: ', err);
        } finally {
            formRef.current?.unmask();
            onClose();
        }
    };

    return (
        <>
            <BaseForm
                ref={formRef}
                onSubmit={handleSubmit}
                fields={getRoleFields(modalType)}
                initialValues={rowData}
                buttons={{
                    closeButton: (
                        <ButtonBase
                            title="Đóng"
                            startIcon="close"
                            color="secondary"
                            onClick={onClose}
                            className="!mx-1"
                        />
                    ),
                    submitButton:
                        modalType === 'detail' ? undefined : (
                            <ButtonBase type="submit" title="Lưu" startIcon="save" className="!mx-1" />
                        ),
                }}
            />
        </>
    );
};

export default RoleForm;
