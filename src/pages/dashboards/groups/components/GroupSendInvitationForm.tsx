import React from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseForm from '~/components/forms/BaseForm';
import { requestApi } from '~/libs/axios';
import { BaseFormModalProps } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { GROUP_SEND_INVITATION_API } from '../api/group.api';
import { groupInvitationFields } from '../config/form-fields';
import { GroupDto, GroupInvitationDto } from '../types/group';

interface Props extends Omit<BaseFormModalProps, 'modalType'> {
    rowData?: GroupDto;
}

const GroupSendInvitationForm: React.FC<Props> = ({ rowData, onSuccess, onClose }) => {
    const handleSubmit = async (formValues: GroupInvitationDto) => {
        try {
            const response = await requestApi('post', GROUP_SEND_INVITATION_API, {
                email: formValues.email,
                groupID: rowData?.groupID,
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
            onClose();
        }
    };

    return (
        <BaseForm
            onSubmit={handleSubmit}
            fields={groupInvitationFields}
            initialValues={rowData}
            buttons={{
                closeButton: <ButtonBase title="Đóng" startIcon="close" color="secondary" onClick={onClose} />,
                submitButton: <ButtonBase type="submit" title="Gửi" startIcon="send" />,
            }}
        />
    );
};

export default GroupSendInvitationForm;
