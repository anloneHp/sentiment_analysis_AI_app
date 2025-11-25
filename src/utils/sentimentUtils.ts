export type SentimentType = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';

export const getSentimentColor = (sentiment: SentimentType): string => {
    switch (sentiment) {
        case 'POSITIVE':
            return '#d4edda';
        case 'NEGATIVE':
            return '#f8d7da';
        case 'NEUTRAL':
        default:
            return '#e2e3e5';
    }
};

export const getSentimentEmoji = (sentiment: SentimentType): string => {
    switch (sentiment) {
        case 'POSITIVE':
            return '😊';
        case 'NEGATIVE':
            return '😔';
        case 'NEUTRAL':
        default:
            return '😐';
    }
};

export const getSentimentLabel = (sentiment: SentimentType): string => {
    switch (sentiment) {
        case 'POSITIVE':
            return 'Pozitif';
        case 'NEGATIVE':
            return 'Negatif';
        case 'NEUTRAL':
        default:
            return 'Nötr';
    }
};

export const getSentimentBackgroundColor = (sentiment: SentimentType): string => {
    switch (sentiment) {
        case 'POSITIVE':
            return '#c3e6cb';
        case 'NEGATIVE':
            return '#f5c6cb';
        case 'NEUTRAL':
        default:
            return '#d6d8db';
    }
};
