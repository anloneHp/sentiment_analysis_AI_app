export interface DailyEntry {
    id: string;
    date: string;
    text: string;
    sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
    summary: string;
    suggestion: string;
}

export interface AIResponse {
    sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
    summary: string;
    suggestion: string;
}

export interface WeeklyStats {
    total: number;
    positive: number;
    negative: number;
    neutral: number;
    entries: DailyEntry[];
}

export type RootStackParamList = {
    Home: undefined;
    History: undefined;
    WeeklySummary: undefined;
};
