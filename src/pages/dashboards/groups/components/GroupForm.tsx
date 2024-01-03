import React from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseForm from '~/components/forms/BaseForm';
import { requestApi } from '~/libs/axios';
import { BaseFormModalProps } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { GROUP_CREATE_API, GROUP_UPDATE_API } from '../api/group.api';
import { groupFields } from '../config/form-fields';
import { GroupCreateDto, GroupDto } from '../types/group';

interface Props extends BaseFormModalProps {
    rowData?: GroupDto;
}

const GroupForm: React.FC<Props> = ({ rowData, modalType, onClose, onSuccess }) => {
    const handleSubmit = async (formValues: GroupCreateDto) => {
        try {
            const url = modalType == 'create' ? GROUP_CREATE_API : GROUP_UPDATE_API + '/' + rowData?.groupID;

            const response = await requestApi<GroupDto>('post', url, formValues);
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
            onClose();
        }
    };

    return (
        <>
            <BaseForm
                onSubmit={handleSubmit}
                fields={groupFields}
                initialValues={rowData}
                buttons={{
                    closeButton: <ButtonBase title="Đóng" startIcon="close" color="secondary" onClick={onClose} />,
                    submitButton:
                        modalType === 'detail' ? undefined : <ButtonBase type="submit" title="Lưu" startIcon="save" />,
                }}
            />
        </>
    );
};

export default GroupForm;
