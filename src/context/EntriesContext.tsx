import React, { createContext, useState, useEffect, useContext } from 'react';
import { DailyEntry } from '../types';
import StorageService from '../services/StorageService';

interface EntriesContextType {
    entries: DailyEntry[];
    addEntry: (entry: DailyEntry) => Promise<void>;
    loadEntries: () => Promise<void>;
}

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export const EntriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [entries, setEntries] = useState<DailyEntry[]>([]);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        const data = await StorageService.getEntries();
        setEntries(data);
    };

    const addEntry = async (entry: DailyEntry) => {
        setEntries(prev => [entry, ...prev]);
        await StorageService.saveEntry(entry);
    };

    return (
        <EntriesContext.Provider value={{ entries, addEntry, loadEntries }}>
            {children}
        </EntriesContext.Provider>
    );
};

export const useEntries = () => {
    const context = useContext(EntriesContext);
    if (!context) {
        throw new Error('useEntries must be used within an EntriesProvider');
    }
    return context;
};
