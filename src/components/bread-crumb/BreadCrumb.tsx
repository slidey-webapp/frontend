import { Breadcrumbs, Link, Typography } from '@mui/material';
import React, { useImperativeHandle, useState } from 'react';
import { matchRoutes } from 'react-router-dom';
import { routeList } from '~/routes/AppRoute';
import BaseIcon from '../icons/BaseIcon';

export type BreadcrumbType = {
    title: string | React.ReactNode;
    path?: string;
};

type Props = {};

export interface BreadcrumbRef {
    getBreadcrumbs: () => BreadcrumbType[];
    setBreadcrumbs: (brs: BreadcrumbType[]) => void;
}

const Breadcrumb = React.forwardRef<BreadcrumbRef, Props>((props, ref) => {
    // @ts-ignore
    const routesMatched = matchRoutes(routeList, location.pathname)?.filter(x => !x.route?.hideBreadcrumb);

    const defaultBreadcrumbs: BreadcrumbType[] = [
        {
            path: '/',
            title: <BaseIcon type="home" size={18} />,
        },
        ...(routesMatched || [])?.map(routeMatch => {
            return {
                path: routeMatch.pathname,
                // @ts-ignore
                title: routeMatch.route.title,
            };
        }),
    ];

    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>(defaultBreadcrumbs);

    useImperativeHandle(
        ref,
        () => ({
            getBreadcrumbs: () => breadcrumbs,
            setBreadcrumbs: brs => setBreadcrumbs(brs),
        }),
        [],
    );

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map((breadcrumb, index) => {
                const isLatest = index === breadcrumbs.length - 1;
                if (!breadcrumb.path || isLatest)
                    return (
                        <Typography key={breadcrumb.path} color="text.primary">
                            {breadcrumb.title}
                        </Typography>
                    );

                return (
                    <Link key={breadcrumb.path} underline="none" color="primary.main" href={breadcrumb.path}>
                        {breadcrumb.title}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
});
export default Breadcrumb;
