import { Box, Button } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseIcon from '~/components/icons/BaseIcon';
import { ConfigItemProps } from './Config';

interface Props extends ConfigItemProps {}

const SideNavItem: React.FC<Props> = ({ disabled, external, icon, path, title }) => {
    const navigate = useNavigate();
    const active = useMemo(() => location.pathname === path, [location.pathname, path]);

    const handleMenuItemClick = () => {
        if (external) {
            return window.open(path);
        }

        return navigate(path);
    };

    return (
        <li>
            <Button
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: '16px',
                    pr: '16px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    },
                    ...(active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    }),
                }}
                onClick={() => handleMenuItemClick()}
            >
                {icon && (
                    <Box
                        component="span"
                        sx={{
                            alignItems: 'center',
                            color: 'neutral.400',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 2,
                            ...(active && {
                                color: 'primary.main',
                            }),
                        }}
                    >
                        <BaseIcon type={icon} />
                    </Box>
                )}
                <Box
                    component="span"
                    sx={{
                        color: 'neutral.400',
                        flexGrow: 1,
                        fontFamily: theme => theme.typography.fontFamily,
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                        ...(active && {
                            color: 'common.white',
                        }),
                        ...(disabled && {
                            color: 'neutral.500',
                        }),
                    }}
                >
                    {title}
                </Box>
            </Button>
        </li>
    );
};

export default SideNavItem;
