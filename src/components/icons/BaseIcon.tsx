import loadable from '@loadable/component';
import { SvgIcon } from '@mui/material';
import React from 'react';

const IconsMap = {
    'information-circle': loadable(() => import('@heroicons/react/24/solid/InformationCircleIcon')),
    'pencil-square': loadable(() => import('@heroicons/react/24/solid/PencilSquareIcon')),
    trash: loadable(() => import('@heroicons/react/24/solid/TrashIcon')),
    plus: loadable(() => import('@heroicons/react/24/solid/PlusIcon')),
    'arrow-path': loadable(() => import('@heroicons/react/24/solid/ArrowPathIcon')),
    'table-cells': loadable(() => import('@heroicons/react/24/solid/TableCellsIcon')),
    'bars-3': loadable(() => import('@heroicons/react/24/solid/Bars3Icon')),
    bell: loadable(() => import('@heroicons/react/24/solid/BellIcon')),
    'magnifying-glass': loadable(() => import('@heroicons/react/24/solid/MagnifyingGlassIcon')),
    users: loadable(() => import('@heroicons/react/24/solid/UsersIcon')),
    'x-mark': loadable(() => import('@heroicons/react/24/solid/XMarkIcon')),
};

type Size = 18 | 20 | 22;

export interface BaseIconProps {
    type: keyof typeof IconsMap;
    size?: Size;
}

const BaseIcon: React.FC<BaseIconProps> = ({ type, size = 20 }) => {
    const Icon = IconsMap[type];
    return (
        <SvgIcon
            style={{
                fontSize: size,
            }}
        >
            <Icon />
        </SvgIcon>
    );
};

export default BaseIcon;
