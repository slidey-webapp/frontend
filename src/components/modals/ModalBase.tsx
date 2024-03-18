import { Dialog, IconButton, Typography } from '@mui/material';
import clsx from 'clsx';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import BaseIcon from '../icons/BaseIcon';

type Zero = 0;
type PositiveInt = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ValidNumber = Zero | PositiveInt;
export type Percentage = `${ValidNumber}%` | `${PositiveInt}${ValidNumber}%` | '100%';
export type ModalWidth = Percentage | number;

interface Props {
    className?: string;
}

export interface ModalBaseRef {
    onOpen: (Component: JSX.Element, title?: string | React.ReactNode, width?: ModalWidth) => void;
    onClose: () => void;
    state: boolean;
}

interface State {
    open: boolean;
    title?: string | React.ReactNode;
    children: JSX.Element | null;
    width: ModalWidth;
}

const ModalBase = forwardRef<ModalBaseRef, Props>((props, ref) => {
    const [state, setState] = useState<State>({
        open: false,
        title: '',
        children: null,
        width: '50%',
    });

    React.useEffect(() => {
        return () => {
            // console.log('unmount');
        };
    }, []);

    const handleOpen = (Component: JSX.Element, title: string | React.ReactNode, width: ModalWidth = '50%') => {
        setState(prevState => ({
            ...prevState,
            title,
            open: true,
            children: Component,
            width,
        }));
    };

    const handleClose = () => setState(prevState => ({ ...prevState, open: false }));

    useImperativeHandle(ref, () => ({
        onOpen: handleOpen,
        onClose: handleClose,
        state: state.open,
    }));

    return (
        <Dialog
            onClose={handleClose}
            open={state.open}
            sx={{
                minWidth: 400,
                maxWidth: '100vw',
                borderRadius: 0,
                bgcolor: 'transparent',
                overflow: 'hidden',
            }}
            PaperProps={{
                sx: {
                    minWidth: 400,
                    maxWidth: '100vw',
                    width: state.width ?? 400,
                },
            }}
        >
            {state.title && (
                <Typography
                    variant="h6"
                    sx={{ py: 2, px: 3 }}
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
            )}
            <div className={clsx('p-6 pt-2 overflow-auto', props.className)}>{state.children}</div>
        </Dialog>
    );
});

ModalBase.displayName = 'ModalBase';

export default ModalBase;
