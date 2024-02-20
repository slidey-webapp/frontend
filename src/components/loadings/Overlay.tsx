import { forwardRef, useImperativeHandle, useState } from 'react';

export interface OverlayRef {
    open: () => void;
    close: () => void;
}

interface Props {}

const Overlay = forwardRef<OverlayRef, Props>((props, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const open = () => setVisible(true);
    const close = () => setVisible(false);

    useImperativeHandle(ref, () => ({
        open: open,
        close: close,
    }));

    if (!visible) return null;
    return (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-white bg-opacity-80 z-9999">
            <div className="inline-block relative w-20 aspect-square">
                <div className="absolute opacity-1 rounded-full animate-loading-ripple border-4 border-solid border-red-500" />
                <div className="absolute opacity-1 rounded-full animate-loading-ripple border-4 border-solid border-red-500 -animation-delay-500" />
            </div>
        </div>
    );
});

export default Overlay;
