import { Popover, PopoverProps } from '@mui/material';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';

export interface DropdownProps extends React.PropsWithChildren {
    overlayContent: JSX.Element | React.ReactNode;
    openClassName?: string;
    wrapperClassName?: string;
    openStyle?: CSSProperties;
    wrapperStyle?: CSSProperties;
    popoverProps?: Partial<PopoverProps>;
}

const Dropdown: React.FC<DropdownProps> = ({
    children,
    overlayContent,
    openClassName,
    wrapperClassName,
    wrapperStyle,
    openStyle,
    popoverProps,
}) => {
    const [anchorElPopover, setAnchorElPopover] = React.useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorElPopover);

    const handleOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setAnchorElPopover(event.currentTarget);
    };

    const handleClose = () => {
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
