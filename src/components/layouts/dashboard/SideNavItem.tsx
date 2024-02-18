import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseIcon from '~/components/icons/BaseIcon';
import { RouteDefinition } from '~/routes/AppRoute';

interface Props {
    routeDefinition: RouteDefinition;
}

const SideNavItem: React.FC<Props> = ({ routeDefinition }) => {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const handleCollapse = () => {
        setOpen(!open);
    };

    const renderGroupItem = (item: RouteDefinition) => {
        return (
            <List
                component="nav"
                sx={{
                    px: '16px',
                }}
                subheader={
                    item.hideTitle ? undefined : (
                        <ListSubheader
                            sx={{
                                color: 'neutral.400',
                                bgcolor: 'transparent',
                                textTransform: 'uppercase',
                                fontWeight: '600',
                                height: 36,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            component="div"
                        >
                            {item.title}
                        </ListSubheader>
                    )
                }
            >
                {item.children && item.children.filter(x => !x.hide).map(renderMenu)}
            </List>
        );
    };

    const renderCollapse = (item: RouteDefinition) => {
        return (
            <>
                <ListItemButton
                    onClick={handleCollapse}
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        height: 40,
                        textAlign: 'left',
                        width: '100%',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        },
                    }}
                >
                    {item.icon && (
                        <ListItemIcon
                            sx={{
                                alignItems: 'center',
                                color: 'neutral.400',
                                display: 'inline-flex',
                                justifyContent: 'center',
                                width: 24,
                                minWidth: 24,
                            }}
                        >
                            <BaseIcon type={item.icon} />
                        </ListItemIcon>
                    )}
                    {!item.hideTitle && (
                        <ListItemText
                            primary={item.title}
                            sx={{
                                alignItems: 'center',
                                color: 'neutral.400',
                                display: 'inline-flex',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                ml: '12px',
                                ...(item.disabled && {
                                    color: 'neutral.500',
                                }),
                            }}
                        />
                    )}
                    {open ? <BaseIcon type="expand-less" /> : <BaseIcon type="expand-more" />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    {item.children && item.children.filter(x => !x.hide).map(renderMenu)}
                </Collapse>
            </>
        );
    };

    const renderItem = (item: RouteDefinition) => {
        const active = location.pathname.includes(item.path);

        return (
            <>
                <ListItemButton
                    key={item.path}
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        height: 40,
                        textAlign: 'left',
                        width: '100%',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        },
                        ...(active && {
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        }),
                    }}
                    onClick={() => {
                        if (item.external) {
                            return window.open(item.path);
                        }

                        return navigate(item.path);
                    }}
                >
                    <ListItemIcon
                        sx={{
                            alignItems: 'center',
                            color: 'neutral.400',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            width: 24,
                            minWidth: 24,
                            ...(active && {
                                color: 'primary.main',
                            }),
                        }}
                    >
                        <BaseIcon type={item.icon ?? 'dot'} size={item.icon ? 20 : 10} />
                    </ListItemIcon>
                    {!item.hideTitle && (
                        <ListItemText
                            primary={item.title}
                            sx={{
                                alignItems: 'center',
                                color: 'neutral.400',
                                display: 'inline-flex',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                ml: '12px',
                                ...(active && {
                                    color: 'primary.main',
                                }),
                                ...(item.disabled && {
                                    color: 'neutral.500',
                                }),
                            }}
                        />
                    )}
                </ListItemButton>
                {item.divider && (
                    <Divider
                        sx={{
                            margin: '15px 0',
                            borderColor: 'neutral.600',
                            borderStyle: 'dashed'
                        }}
                    />
                )}
            </>
        );
    };

    const renderMenu = (item: RouteDefinition) => {
        if (item.hide) return null;
        if (item.group) return renderGroupItem(item);
        if (item.children && item.children.filter(x => !x.hide).length > 0) {
            return renderCollapse(item);
        }

        return renderItem(item);
    };

    return <>{renderMenu(routeDefinition)}</>;
};

export default SideNavItem;
