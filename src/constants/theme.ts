export const Colors = {
    primary: '#6200ee',
    primaryDark: '#3700b3',
    primaryLight: '#bb86fc',

    secondary: '#03dac6',
    secondaryDark: '#018786',

    sentimentPositive: '#FFF9C4',
    sentimentPositiveDark: '#FBC02D',
    sentimentNegative: '#E0E0E0',
    sentimentNegativeDark: '#9E9E9E',
    sentimentNeutral: '#F5F5F5',
    sentimentNeutralDark: '#BDBDBD',

    background: '#ffffff',
    backgroundSecondary: '#f5f5f5',

    text: '#000000',
    textSecondary: '#666666',
    textLight: '#888888',

    error: '#b00020',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3',

    border: '#e0e0e0',
    borderLight: '#f0f0f0',
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const BorderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 999,
};

export const FontSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

export const FontWeights = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
};

export const Shadows = {
    small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
};
