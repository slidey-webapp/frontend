import clsx from 'clsx';
import React, { CSSProperties, PropsWithChildren, Ref } from 'react';
import Breadcrumb, { BreadcrumbRef } from '../bread-crumb/BreadCrumb';

interface Props extends PropsWithChildren {
    className?: string;
    style?: CSSProperties;
    breadcrumbRef?: Ref<BreadcrumbRef>;
}

export const AppContainer: React.FC<Props> = (props: Props) => {
    return (
        <div
            className={clsx(
                'p-4 bg-white h-full relative flex flex-col flex-1 rounded-sm overflow-auto',
                props.className,
            )}
            style={props.style}
        >
            <div className="w-full mb-1">
                <Breadcrumb ref={props.breadcrumbRef} />
            </div>
            {props.children}
        </div>
    );
};
