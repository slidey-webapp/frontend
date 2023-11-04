import { Breadcrumbs, Link, Typography } from '@mui/material';
import { matchRoutes } from 'react-router-dom';
import { routeList } from '~/routes/AppRoute';
import BaseIcon from '../icons/BaseIcon';

export type BreadcrumbType = {
    title: string | React.ReactNode;
    path?: string;
};

type Props = {};

const Breadcrumb: React.FC<Props> = () => {
    // @ts-ignore
    const routesMatched = matchRoutes(routeList, location.pathname);

    const breadcrumbs: BreadcrumbType[] = [
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
};

export default Breadcrumb;
