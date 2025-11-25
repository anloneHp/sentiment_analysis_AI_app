export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatDateTime = (dateString: string): string => {
    return `${formatDate(dateString)} ${formatTime(dateString)}`;
};

export const getWeekRange = (date: Date = new Date()): { start: Date; end: Date } => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
    return date >= start && date <= end;
};
