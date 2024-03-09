import { FormField } from '~/components/forms/BaseForm';
import { BaseFormModalProps } from '~/types/shared';
import { RoleCreateDto } from '../types/role';

export const getRoleFields = (modalType: BaseFormModalProps['modalType']): FormField[] => {
    return [
        {
            name: nameof.full<RoleCreateDto>(x => x.code),
            classNameCol: 'col-span-12',
            label: 'Mã vai trò',
            type: 'text',
            required: true,
            disabled: modalType !== 'create',
        },
        {
            name: nameof.full<RoleCreateDto>(x => x.name),
            classNameCol: 'col-span-12',
            label: 'Tên vai trò',
            type: 'text',
            required: true,
        },
    ];
};