import React, { useImperativeHandle } from 'react';
import { FullScreenProps, FullScreen as ReactFullScreen, useFullScreenHandle } from 'react-full-screen';

interface Props extends React.PropsWithChildren, Omit<FullScreenProps, 'handle' | 'children'> {}

export interface FullScreenRef {
    open: () => Promise<void>;
    exit: () => Promise<void>;
}

const FullScreen = React.forwardRef<FullScreenRef, Props>(({ children, ...props }, ref) => {
    const handleFullScreen = useFullScreenHandle();

    useImperativeHandle(
        ref,
        () => ({
            open: () => handleFullScreen?.enter(),
            exit: () => handleFullScreen?.exit(),
        }),
        [],
    );

    return (
        <ReactFullScreen {...props} handle={handleFullScreen}>
            {children}
        </ReactFullScreen>
    );
});

export default FullScreen;
