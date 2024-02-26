import { Popover, PopoverProps } from '@mui/material';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';

export interface DropdownProps extends React.PropsWithChildren {
    overlayContent: JSX.Element | React.ReactNode;
    openClassName?: string;
    wrapperClassName?: string;
    openStyle?: CSSProperties;
    wrapperStyle?: CSSProperties;
    hidden?: boolean;
    popoverProps?: Partial<PopoverProps>;
}

const Dropdown: React.FC<DropdownProps> = ({
    children,
    overlayContent,
    openClassName,
    wrapperClassName,
    wrapperStyle,
    openStyle,
    hidden,
    popoverProps,
}) => {
    const [anchorElPopover, setAnchorElPopover] = React.useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorElPopover);

    const handleOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (hidden) return;
        setAnchorElPopover(event.currentTarget);
    };

    const handleClose = () => {
        if (hidden) return;
        setAnchorElPopover(null);
    };

    return (
        <div className={clsx('w-fit h-fit relative', wrapperClassName)} style={wrapperStyle}>
            <div className={clsx('relative', openClassName)} style={openStyle} onClick={handleOpen}>
                {children}
            </div>
            <Popover
                anchorEl={anchorElPopover}
                anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom',
                }}
                onClose={handleClose}
                open={openPopover}
                slotProps={{
                    paper: {
                        sx: { width: 480 },
                    },
                }}
                sx={{
                    zIndex: 1000,
                }}
                {...popoverProps}
            >
                {overlayContent}
            </Popover>
        </div>
    );
};

export default Dropdown;
