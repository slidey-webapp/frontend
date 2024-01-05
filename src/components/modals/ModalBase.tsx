import { Dialog, DialogProps, IconButton, Typography } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import BaseIcon from '../icons/BaseIcon';

type Zero = 0;
type PositiveInt = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ValidNumber = Zero | PositiveInt;
export type Percentage = `${ValidNumber}%` | `${PositiveInt}${ValidNumber}%` | '100%';

interface Props extends Partial<DialogProps> {}

export interface ModalBaseRef {
    onOpen: (Component: JSX.Element, title: string | React.ReactNode, percentWidth?: Percentage) => void;
    onClose: () => void;
}

interface State {
    open: boolean;
    title?: string | React.ReactNode;
    children: JSX.Element | null;
    percentWidth: Percentage;
}

const ModalBase = forwardRef<ModalBaseRef, Props>((props, ref) => {
    const [state, setState] = useState<State>({
        open: false,
        title: '',
        children: null,
        percentWidth: '50%',
    });

    React.useEffect(() => {
        return () => {
            // console.log('unmount');
        };
    }, []);

    const handleOpen = (Component: JSX.Element, title: string | React.ReactNode, percentWidth: Percentage = '50%') => {
        setState(prevState => ({
            ...prevState,
            title,
            open: true,
            children: Component,
            percentWidth,
        }));
    };

    const handleClose = () => setState(prevState => ({ ...prevState, open: false }));

    useImperativeHandle(
        ref,
        () => ({
            onOpen: handleOpen,
            onClose: handleClose,
        }),
        [],
    );

    return (
        <Dialog
            onClose={handleClose}
            open={state.open}
            sx={{
                minWidth: 400,
                maxWidth: '100vw',
                borderRadius: 0,
                bgcolor: 'transparent',
            }}
            PaperProps={{
                sx: {
                    minWidth: 400,
                    maxWidth: '100vw',
                    width: state.percentWidth ?? 400,
                },
            }}
        >
            <Typography
                variant="h6"
                sx={{ pt: 2, px: 3 }}
                display="flex"
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <div>{state.title}</div>
                <div className="w-6 h-6 rounded-full duration-300">
                    <IconButton onClick={handleClose}>
                        <BaseIcon type="close" />
                    </IconButton>
                </div>
            </Typography>
            <div className="p-6">{state.children}</div>
        </Dialog>
    );
});

ModalBase.displayName = 'ModalBase';

export default ModalBase;
