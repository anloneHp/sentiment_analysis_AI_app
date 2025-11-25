import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyEntry } from '../types';

class StorageService {
    private static instance: StorageService;
    private readonly STORAGE_KEY = '@daily_entries';
    private readonly VERSION_KEY = '@storage_version';
    private readonly CURRENT_VERSION = '1.0';

    private constructor() {
        this.checkAndMigrateData();
    }

    public static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    private async checkAndMigrateData(): Promise<void> {
        try {
            const version = await AsyncStorage.getItem(this.VERSION_KEY);
            if (!version) {
                await AsyncStorage.setItem(this.VERSION_KEY, this.CURRENT_VERSION);
            }
        } catch (e) {
            console.error('Migration check failed', e);
        }
    }

    public async saveEntry(entry: DailyEntry): Promise<void> {
        try {
            const existingEntries = await this.getEntries();
            const newEntries = [entry, ...existingEntries];
            await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(newEntries));
        } catch (e) {
            console.error('Failed to save entry', e);
            throw new Error('Kayıt kaydedilemedi');
        }
    }

    public async getEntries(): Promise<DailyEntry[]> {
        try {
            const jsonValue = await AsyncStorage.getItem(this.STORAGE_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error('Failed to fetch entries', e);
            return [];
        }
    }

    public async getEntriesByDateRange(startDate: Date, endDate: Date): Promise<DailyEntry[]> {
        try {
            const allEntries = await this.getEntries();
            return allEntries.filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= startDate && entryDate <= endDate;
            });
        } catch (e) {
            console.error('Failed to fetch entries by date range', e);
            return [];
        }
    }

    public async getWeeklyStats(startDate: Date, endDate: Date): Promise<{
        total: number;
        positive: number;
        negative: number;
        neutral: number;
        entries: DailyEntry[];
    }> {
        try {
            const entries = await this.getEntriesByDateRange(startDate, endDate);

            const stats = {
                total: entries.length,
                positive: entries.filter(e => e.sentiment === 'POSITIVE').length,
                negative: entries.filter(e => e.sentiment === 'NEGATIVE').length,
                neutral: entries.filter(e => e.sentiment === 'NEUTRAL').length,
                entries,
            };

            return stats;
        } catch (e) {
            console.error('Failed to calculate weekly stats', e);
            return {
                total: 0,
                positive: 0,
                negative: 0,
                neutral: 0,
                entries: [],
            };
        }
    }

    public async getEntryById(id: string): Promise<DailyEntry | null> {
        try {
            const entries = await this.getEntries();
            return entries.find(entry => entry.id === id) || null;
        } catch (e) {
            console.error('Failed to fetch entry by ID', e);
            return null;
        }
    }

    public async deleteEntry(id: string): Promise<void> {
        try {
            const entries = await this.getEntries();
            const filteredEntries = entries.filter(entry => entry.id !== id);
            await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredEntries));
        } catch (e) {
            console.error('Failed to delete entry', e);
            throw new Error('Kayıt silinemedi');
        }
    }

    public async clearEntries(): Promise<void> {
        try {
            await AsyncStorage.removeItem(this.STORAGE_KEY);
        } catch (e) {
            console.error('Failed to clear entries', e);
            throw new Error('Kayıtlar temizlenemedi');
        }
    }

    public async getEntryCount(): Promise<number> {
        try {
            const entries = await this.getEntries();
            return entries.length;
        } catch (e) {
            console.error('Failed to get entry count', e);
            return 0;
        }
    }
}

export default StorageService.getInstance();
