import { FormField } from '~/components/forms/BaseForm';
import { RoleDto } from './role';
import { BaseFormModalProps } from '~/types/shared';

export const getRoleFields = (modalType: BaseFormModalProps['modalType']): FormField[] => {
    return [
        {
            name: nameof.full<RoleDto>(x => x.code),
            classNameCol: 'col-span-12',
            label: 'Mã vai trò',
            type: 'text',
            required: true,
            disabled: modalType !== 'create',
        },
        {
            name: nameof.full<RoleDto>(x => x.name),
            classNameCol: 'col-span-12',
            label: 'Tên vai trò',
            type: 'text',
            required: true,
        },
    ];
};
