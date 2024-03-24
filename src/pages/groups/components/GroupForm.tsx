import React, { useRef } from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseForm, { BaseFormRef } from '~/components/forms/BaseForm';
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
    const formRef = useRef<BaseFormRef>(null);

    const handleSubmit = async (formValues: GroupCreateDto) => {
        formRef.current?.mask();
        try {
            const url = modalType == 'create' ? GROUP_CREATE_API : GROUP_UPDATE_API + '/' + rowData?.groupID;

            const response = await requestApi<GroupDto>('post', url, {
                ...formValues,
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
            formRef.current?.unmask();
            onClose();
        }
    };

    return (
        <>
            <BaseForm
                ref={formRef}
                onSubmit={handleSubmit}
                fields={groupFields}
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

export default GroupForm;
