import { Color } from '@mui/material';
import { PaletteColorOptions, alpha } from '@mui/material/styles';

const withAlphas = (colorTheme: any): PaletteColorOptions => {
    return {
        ...colorTheme,
        alpha4: alpha(colorTheme.main, 0.04),
        alpha8: alpha(colorTheme.main, 0.08),
        alpha12: alpha(colorTheme.main, 0.12),
        alpha30: alpha(colorTheme.main, 0.3),
        alpha50: alpha(colorTheme.main, 0.5),
    };
};

export const neutral: Partial<Color> = {
    50: '#F8F9FA',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D2D6DB',
    400: '#9DA4AE',
    500: '#6C737F',
    600: '#2d3748',
    700: '#1C2536',
    800: '#111927',
    900: '#0e1320'
};

export const indigo = withAlphas({
    lightest: '#F5F7FF',
    light: '#EBEEFE',
    main: '#6366F1',
    dark: '#4338CA',
    darkest: '#312E81',
    contrastText: '#FFFFFF',
});

export const success = withAlphas({
    lightest: '#F0FDF9',
    light: '#3FC79A',
    main: '#10B981',
    dark: '#0B815A',
    darkest: '#134E48',
    contrastText: '#FFFFFF',
});

export const info = withAlphas({
    lightest: '#ECFDFF',
    light: '#CFF9FE',
    main: '#06AED4',
    dark: '#0E7090',
    darkest: '#164C63',
    contrastText: '#FFFFFF',
});

export const warning = withAlphas({
    lightest: '#FFFAEB',
    light: '#FEF0C7',
    main: '#F79009',
    dark: '#B54708',
    darkest: '#7A2E0E',
    contrastText: '#FFFFFF',
});

export const error = withAlphas({
    lightest: '#FEF3F2',
    light: '#FEE4E2',
    main: '#F04438',
    dark: '#B42318',
    darkest: '#7A271A',
    contrastText: '#FFFFFF',
});

export const secondary = withAlphas({
    lightest: '#f5f5f5',
    light: '#e0e0e0',
    main: '#9e9e9e',
    dark: '#616161',
    darkest: '#212121',
    contrastText: '#FFFFFF',
});
