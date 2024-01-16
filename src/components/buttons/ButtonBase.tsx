import { Button, ButtonProps, Tooltip } from '@mui/material';
import * as React from 'react';
import BaseIcon, { BaseIconProps } from '../icons/BaseIcon';
import clsx from 'clsx';

type IconProps = {
    startIcon?: BaseIconProps['type'];
    endIcon?: BaseIconProps['type'];
};

type Props = Omit<ButtonProps, 'startIcon' | 'endIcon'> &
    IconProps & {
        tooltip?: string;
    };

export const ButtonBase: React.FC<Props> = ({
    type = 'button',
    variant = 'contained',
    startIcon,
    endIcon,
    color = 'primary',
    size = 'small',
    className,
    ...props
}) => {
    const element = (
        <Button
            type={type}
            title={undefined}
            variant={variant}
            color={color}
            size={size}
            className={className}
            startIcon={startIcon && <BaseIcon type={startIcon} size={18}/>}
            endIcon={endIcon && <BaseIcon type={endIcon} size={18}/>}
            {...props}
        >
            {props.title && <span>{props.title}</span>}
        </Button>
    );

    if (props.tooltip) return <Tooltip title={props.tooltip}>{element}</Tooltip>;

    return element;
};
