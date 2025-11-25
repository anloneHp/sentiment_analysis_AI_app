import React, { useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import { useEntries } from '../context/EntriesContext';
import { DailyEntry } from '../types';
import EntryCard from '../components/EntryCard';
import { Colors, Spacing } from '../constants/theme';
import { Messages } from '../constants/messages';

const HistoryScreen = () => {
    const { entries, loadEntries } = useEntries();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadEntries();
        setRefreshing(false);
    };

    const renderItem = ({ item }: { item: DailyEntry }) => (
        <EntryCard entry={item} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={entries}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text variant="titleMedium" style={styles.emptyTitle}>
                            {Messages.empty.noEntries}
                        </Text>
                        <Text variant="bodyMedium" style={styles.emptyDescription}>
                            {Messages.empty.noEntriesDescription}
                        </Text>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[Colors.primary]}
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundSecondary,
    },
    list: {
        padding: Spacing.md,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Spacing.xxl,
        paddingHorizontal: Spacing.lg,
    },
    emptyTitle: {
        color: Colors.textSecondary,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    emptyDescription: {
        color: Colors.textLight,
        textAlign: 'center',
    },
});

export default HistoryScreen;
