import loadable from '@loadable/component';
import { SvgIcon } from '@mui/material';
import React, { CSSProperties } from 'react';

const IconsMap = {
    info: loadable(() => import('@mui/icons-material/InfoOutlined')),
    edit: loadable(() => import('@mui/icons-material/BorderColor')),
    'drive-file-rename-outlined': loadable(() => import('@mui/icons-material/DriveFileRenameOutlineOutlined')),
    delete: loadable(() => import('@mui/icons-material/Delete')),
    'delete-outlined': loadable(() => import('@mui/icons-material/DeleteOutline')),
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
    'color-lens-outlined': loadable(() => import('@mui/icons-material/ColorLensOutlined')),
    duplicate: loadable(() => import('@mui/icons-material/ContentCopy')),
    'arrow-back': loadable(() => import('@mui/icons-material/ArrowBack')),
    'arrow-forward': loadable(() => import('@mui/icons-material/ArrowForward')),
    'full-screen': loadable(() => import('@mui/icons-material/Fullscreen')),
    'full-screen-exit': loadable(() => import('@mui/icons-material/FullscreenExit')),
    'thumb-up-alt': loadable(() => import('@mui/icons-material/ThumbUpAlt')),
    'thumb-up-alt-outlined': loadable(() => import('@mui/icons-material/ThumbUpAltOutlined')),
    'question-answer': loadable(() => import('@mui/icons-material/QuestionAnswer')),
    comment: loadable(() => import('@mui/icons-material/Comment')),
    'play-arrow': loadable(() => import('@mui/icons-material/PlayArrow')),
    'keyboard-alt-outlined': loadable(() => import('@mui/icons-material/KeyboardAltOutlined')),
    keyboard: loadable(() => import('@mui/icons-material/Keyboard')),
    'message-outlined': loadable(() => import('@mui/icons-material/MessageOutlined')),
    'groups-outlined': loadable(() => import('@mui/icons-material/GroupsOutlined')),
    'presentation-outlined': loadable(() => import('@mui/icons-material/CoPresentOutlined')),
    'slide-outlined': loadable(() => import('@mui/icons-material/SlideshowOutlined')),
    'dashboard-outlined': loadable(() => import('@mui/icons-material/DashboardOutlined')),
    public: loadable(() => import('@mui/icons-material/Public')),
    lock: loadable(() => import('@mui/icons-material/Lock')),
    'horizontal-align-left': loadable(() => import('@mui/icons-material/FormatAlignLeft')),
    'horizontal-align-right': loadable(() => import('@mui/icons-material/FormatAlignRight')),
    'horizontal-align-center': loadable(() => import('@mui/icons-material/FormatAlignCenter')),
    'vertical-align-bottom': loadable(() => import('@mui/icons-material/VerticalAlignBottom')),
    'vertical-align-center': loadable(() => import('@mui/icons-material/VerticalAlignCenter')),
    'vertical-align-top': loadable(() => import('@mui/icons-material/VerticalAlignTop')),
    'text-increase': loadable(() => import('@mui/icons-material/TextIncrease')),
    'text-decrease': loadable(() => import('@mui/icons-material/TextDecrease')),
    'bar-chart': loadable(() => import('@mui/icons-material/BarChart')),
    'pie-chart': loadable(() => import('@mui/icons-material/PieChart')),
    'donut-chart': loadable(() => import('@mui/icons-material/DonutLarge')),
    'line-chart': loadable(() => import('@mui/icons-material/ShowChart')),
    'reload': loadable(() => import('@mui/icons-material/Replay')),
};

type Size = 8 | 10 | 12 | 14 | 16 | 18 | 20 | 22 | 24 |26 | 28;

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
