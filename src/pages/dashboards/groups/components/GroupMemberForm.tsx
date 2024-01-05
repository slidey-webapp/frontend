import _ from 'lodash';
import React from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseForm, { FormField } from '~/components/forms/BaseForm';
import { ComboOptionConstant } from '~/configs/constants';
import { BaseFormModalProps } from '~/types/shared';
import { GroupMemberDto, GroupMemberRole } from '../types/group';

interface Props extends Omit<BaseFormModalProps, 'modalType' | 'onSuccess'> {
    members: GroupMemberDto[];
}

const GroupMemberForm: React.FC<Props> = ({ members, onClose }) => {
    const handleUpdateRole = async (formBody: { groupID: number; accountID: number; role: GroupMemberRole }) => {
        // try {
        //     const url = modalType == 'create' ? GROUP_CREATE_API : GROUP_UPDATE_API + '/' + rowData?.groupID;
        //     const response = await requestApi<GroupDto>('post', url, formValues);
        //     if (response?.status === 200 || response?.status === 400) {
        //         if (response.status === 200) {
        //             onSuccess();
        //         } else {
        //             NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra');
        //         }
        //     }
        // } catch (err) {
        //     console.log('err: ', err);
        // } finally {
        //     onClose();
        // }
    };

    const getFormFields = (): FormField[] => {
        return _.flatten<FormField>(
            members.map((member, index) => {
                return [
                    {
                        name: `members[${index}].` + nameof.full<GroupMemberDto>(x => x.fullname),
                        classNameCol: 'col-span-4',
                        label: 'Tên',
                        type: 'text',
                        disabled: true,
                    },
                    {
                        name: `members[${index}].` + nameof.full<GroupMemberDto>(x => x.email),

                        classNameCol: 'col-span-4',
                        label: 'Email',
                        type: 'email',
                        disabled: true,
                    },
                    {
                        name: `members[${index}].` + nameof.full<GroupMemberDto>(x => x.role),
                        classNameCol: 'col-span-4',
                        label: 'Vai trò',
                        type: 'select',
                        options: ComboOptionConstant.ROLE,
                        onChange: event => {
                            const role = event.target?.value;
                            handleUpdateRole({
                                groupID: member.groupID,
                                accountID: member.accountID,
                                role: role,
                            });
                        },
                    },
                ] as FormField[];
            }),
        );
    };

    return (
        <div>asd</div>
        // <BaseForm
        //     fields={getFormFields()}
        //     initialValues={{ members }}
        //     buttons={{
        //         closeButton: <ButtonBase title="Đóng" startIcon="close" color="secondary" onClick={onClose} />,
        //     }}
        // />
    );
};

export default GroupMemberForm;
