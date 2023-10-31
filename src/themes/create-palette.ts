import { common } from '@mui/material/colors';
import { PaletteOptions, alpha } from '@mui/material/styles';
import { error, indigo, info, neutral, success, warning } from './colors';

// todo: change light palette
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
        background: {
            default: neutral[900],
            paper: neutral[800] ,
        },
        divider: neutral[600],
        error,
        info,
        mode: 'dark',
        // @ts-ignore
        neutral,
        primary: indigo,
        success,
        text: {
            primary: neutral[100],
            secondary: neutral[400],
            disabled: alpha(neutral[400] || '', 0.38),
        },
        warning,
    };
};
