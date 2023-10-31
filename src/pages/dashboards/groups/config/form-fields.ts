import { FormField } from '~/components/forms/BaseForm';
import { GroupDto } from '../types/group';

export const groupFields: FormField[] = [
    {
        name: nameof.full<GroupDto>(x => x.name),
        classNameCol: 'col-span-12',
        label: 'Tên nhóm',
        type: 'text',
        required: true,
    },
    {
        name: nameof.full<GroupDto>(x => x.description),
        classNameCol: 'col-span-12',
        label: 'Mô tả',
        type: 'textArea',
        required: true,
    },
];
