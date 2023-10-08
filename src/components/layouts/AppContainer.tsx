import clsx from 'clsx';
import React, { CSSProperties, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    className?: string;
    style?: CSSProperties;
}

export const AppContainer: React.FC<Props> = (props: Props) => {
    return (
        <div
            className={clsx(
                'p-2.5 bg-white h-full relative flex flex-col flex-1 rounded-sm overflow-auto',
                props.className,
            )}
            style={props.style}
        >
            {props.children}
        </div>
    );
};
