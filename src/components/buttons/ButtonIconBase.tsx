import { Button, ButtonProps, Tooltip } from '@mui/material';
import * as React from 'react';
import BaseIcon, { BaseIconProps } from '../icons/BaseIcon';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';

type Props = Omit<ButtonProps, 'size'> & {
    tooltip?: string;
    size?: Size;
    icon: BaseIconProps['type'];
};

const sizes: {
    [key in Size]: React.CSSProperties;
} = {
    small: {
        width: 32,
        height: 32,
    },
    medium: {
        width: 36,
        height: 36,
    },
    large: {
        width: 40,
        height: 40,
    },
    extraLarge: {
        width: 56,
        height: 56,
    },
};

const iconSizes: {
    [key in Size]: BaseIconProps['size'];
} = {
    small: 16,
    medium: 18,
    large: 20,
    extraLarge: 28,
};

export const ButtonIconBase: React.FC<Props> = ({
    color = 'primary',
    variant = 'text',
    size = 'medium',
    icon,
    style,
    ...props
}) => {
    const element = (
        <Button
            variant={variant}
            color={color}
            style={{
                minWidth: 'unset',
                borderRadius: '100%',
                margin: 2,
                ...sizes[size],
                ...style,
            }}
            // @ts-ignore
            size={size}
            {...props}
        >
            <BaseIcon type={icon} size={iconSizes[size]} />
        </Button>
    );

    if (props.tooltip) return <Tooltip title={props.tooltip}>{element}</Tooltip>;

    return element;
};

export default ButtonIconBase;
