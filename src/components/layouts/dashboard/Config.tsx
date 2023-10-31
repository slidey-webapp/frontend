import { BaseIconProps } from '~/components/icons/BaseIcon';

export interface ConfigItemProps {
    title: string;
    disabled?: boolean;
    external?: boolean;
    path: string;
    icon: BaseIconProps['type'];
}

const ConfigItems: ConfigItemProps[] = [
    {
        title: 'Quản lý nhóm',
        path: '/dashboard/group',
        icon: 'table-cells',
    },
    {
        title: 'Dashboard Grid',
        path: '/dashboard/grid',
        icon: 'table-cells',
    },
    {
        title: 'Dashboard Form',
        path: '/dashboard/form',
        icon: 'table-cells',
    },
    {
        title: 'Dashboard External',
        path: '/dashboard/external',
        icon: 'table-cells',
        external: true,
    },
];

export default ConfigItems;
