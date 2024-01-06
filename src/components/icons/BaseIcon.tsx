import loadable from '@loadable/component';
import { SvgIcon } from '@mui/material';
import React, { CSSProperties } from 'react';

const IconsMap = {
    info: loadable(() => import('@mui/icons-material/InfoOutlined')),
    edit: loadable(() => import('@mui/icons-material/BorderColor')),
    delete: loadable(() => import('@mui/icons-material/Delete')),
    add: loadable(() => import('@mui/icons-material/Add')),
    refresh: loadable(() => import('@mui/icons-material/Refresh')),
    list: loadable(() => import('@mui/icons-material/List')),
    menu: loadable(() => import('@mui/icons-material/Menu')),
    bell: loadable(() => import('@mui/icons-material/Notifications')),
    search: loadable(() => import('@mui/icons-material/Search')),
    users: loadable(() => import('@mui/icons-material/PeopleOutline')),
    close: loadable(() => import('@mui/icons-material/Close')),
    'chevron-left': loadable(() => import('@mui/icons-material/ChevronLeft')),
    'chevron-right': loadable(() => import('@mui/icons-material/ChevronRight')),
    home: loadable(() => import('@mui/icons-material/Home')),
    'expand-more': loadable(() => import('@mui/icons-material/ExpandMore')),
    'expand-less': loadable(() => import('@mui/icons-material/ExpandLess')),
    dot: loadable(() => import('@mui/icons-material/FiberManualRecord')),
    save: loadable(() => import('@mui/icons-material/Save')),
    send: loadable(() => import('@mui/icons-material/Send')),
    email: loadable(() => import('@mui/icons-material/Email')),
    group: loadable(() => import('@mui/icons-material/Group')),
    remove: loadable(() => import('@mui/icons-material/Remove')),
    'forward-to-inbox-outlined': loadable(() => import('@mui/icons-material/ForwardToInboxOutlined')),
    'lock-reset': loadable(() => import('@mui/icons-material/LockReset')),
    'do-disturb': loadable(() => import('@mui/icons-material/DoDisturb')),
};

type Size = 8 | 10 | 12 | 14 | 16 | 18 | 20 | 22 | 24;

export interface BaseIconProps {
    type: keyof typeof IconsMap;
    size?: Size;
    className?: string;
    style?: CSSProperties;
}

const BaseIcon: React.FC<BaseIconProps> = ({ type, size = 20, className, style }) => {
    const Icon = IconsMap[type];
    return (
        <SvgIcon
            style={{
                fontSize: size,
                ...style,
            }}
            className={className}
        >
            <Icon />
        </SvgIcon>
    );
};

export default BaseIcon;
