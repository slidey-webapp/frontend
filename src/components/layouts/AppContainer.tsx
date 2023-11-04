import clsx from 'clsx';
import React, { CSSProperties, PropsWithChildren } from 'react';
import Breadcrumb from '../bread-crumb/BreadCrumb';

interface Props extends PropsWithChildren {
    className?: string;
    style?: CSSProperties;
}

export const AppContainer: React.FC<Props> = (props: Props) => {
    return (
        <div
            className={clsx(
                'px-6 py-16 bg-white h-full relative flex flex-col flex-1 rounded-sm overflow-auto',
                props.className,
            )}
            style={props.style}
        >
            <div className="w-full mb-1">
                <Breadcrumb />
            </div>
            {props.children}
        </div>
    );
};
