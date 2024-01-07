import { FormField } from '~/components/forms/BaseForm';
import { ComboOptionConstant } from '~/configs/constants';
import { GroupCreateDto, GroupInvitationDto, GroupMemberDto } from '../types/group';

export const groupFields: FormField[] = [
    {
        name: nameof.full<GroupCreateDto>(x => x.name),
        classNameCol: 'col-span-12',
        label: 'Tên nhóm',
        type: 'text',
        required: true,
    },
    {
        name: nameof.full<GroupCreateDto>(x => x.description),
        classNameCol: 'col-span-12',
        label: 'Mô tả',
        type: 'richText',
        required: true,
    },
];

export const groupInvitationFields: FormField[] = [
    {
        name: nameof.full<GroupInvitationDto>(x => x.email),
        classNameCol: 'col-span-12',
        label: 'Email',
        type: 'email',
        required: true,
    },
];

export const groupMemberFields: FormField[] = [
    {
        name: nameof.full<GroupMemberDto>(x => x.fullname),
        classNameCol: 'col-span-4',
        label: 'Tên',
        type: 'text',
        disabled: true,
    },
    {
        name: nameof.full<GroupMemberDto>(x => x.email),
        classNameCol: 'col-span-4',
        label: 'Email',
        type: 'email',
        disabled: true,
    },
    {
        name: nameof.full<GroupMemberDto>(x => x.role),
        classNameCol: 'col-span-4',
        label: 'Vai trò',
        type: 'select',
        options: ComboOptionConstant.ROLE,
    },
];
