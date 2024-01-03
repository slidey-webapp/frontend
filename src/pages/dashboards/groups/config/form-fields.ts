import { FormField } from '~/components/forms/BaseForm';
import { GroupCreateDto } from '../types/group';

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
