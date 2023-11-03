import { PaletteOptions, alpha } from '@mui/material/styles';
import { error, indigo, info, neutral, success, warning } from './colors';

export const createPalette = (): PaletteOptions => {
    return {
        action: {
            active: neutral[500],
            disabled: alpha(neutral[900] || '', 0.38),
            disabledBackground: alpha(neutral[900] || '', 0.12),
            focus: alpha(neutral[900] || '', 0.16),
            hover: alpha(neutral[900] || '', 0.04),
            selected: alpha(neutral[900] || '', 0.12),
        },
        divider: neutral[100],
        error,
        info,
        mode: 'light',
        // @ts-ignore
        neutral,
        primary: indigo,
        success,
        text: {
            primary: neutral[900],
            secondary: neutral[500],
            // @ts-ignore
            disabled: alpha(neutral[900], 0.38),
        },
        warning,
    };
};
