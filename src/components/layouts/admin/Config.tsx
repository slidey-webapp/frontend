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
        title: 'Example Grid',
        path: '/example/grid',
        icon: 'table-cells',
    },
    {
        title: 'Example Form',
        path: '/example/form',
        icon: 'table-cells',
    },
    {
        title: 'Example External',
        path: '/example/external',
        icon: 'table-cells',
        external: true,
    },
];

export default ConfigItems;
