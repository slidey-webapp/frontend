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
        icon: 'list',
    },
    {
        title: 'Dashboard Grid',
        path: '/dashboard/grid',
        icon: 'list',
    },
    {
        title: 'Dashboard Form',
        path: '/dashboard/form',
        icon: 'list',
    },
    {
        title: 'Dashboard External',
        path: '/dashboard/external',
        icon: 'list',
        external: true,
    },
];

export default ConfigItems;
