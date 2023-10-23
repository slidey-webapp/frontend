import { CSSProperties, forwardRef, useImperativeHandle, useState } from 'react';

export interface OverlayRef {
    open: () => void;
    close: () => void;
}
interface Props {
    style?: CSSProperties;
}

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
        <div
            style={Object.assign(
                {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    background: 'rgba(255,255,255,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                props.style,
            )}
        >
            <div
                style={Object.assign(
                    {
                        zIndex: 99999,
                    },
                    props.style,
                )}
            >
                <div className="loading">
                    {/* <Spin
                        tip={
                            props.isPercentage
                                ? `${Math.round(state?.processValue ?? 0)}% ${state?.defaultText}`
                                : state?.defaultText
                        }
                    /> */}
                    overlay
                </div>
            </div>
        </div>
    );
});

export default Overlay;
