import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, SegmentedButtons } from 'react-native-paper';
import StorageService from '../services/StorageService';
import { DailyEntry } from '../types';
import { getWeekRange } from '../utils/dateUtils';
import { getSentimentColor, getSentimentLabel } from '../utils/sentimentUtils';
import { Colors, Spacing, BorderRadius } from '../constants/theme';
import { Messages } from '../constants/messages';
import EntryCard from '../components/EntryCard';

const WeeklySummaryScreen = () => {
    const [weekOffset, setWeekOffset] = useState(0);
    const [stats, setStats] = useState({
        total: 0,
        positive: 0,
        negative: 0,
        neutral: 0,
        entries: [] as DailyEntry[],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWeeklyData();
    }, [weekOffset]);

    const loadWeeklyData = async () => {
        setLoading(true);
        const today = new Date();
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + (weekOffset * 7));

        const { start, end } = getWeekRange(targetDate);
        const weeklyStats = await StorageService.getWeeklyStats(start, end);

        setStats(weeklyStats);
        setLoading(false);
    };

    const getPercentage = (count: number): string => {
        if (stats.total === 0) return '0';
        return ((count / stats.total) * 100).toFixed(0);
    };

    const getMostCommonSentiment = (): string => {
        if (stats.total === 0) return 'Veri yok';

        const max = Math.max(stats.positive, stats.negative, stats.neutral);
        if (max === stats.positive) return getSentimentLabel('POSITIVE');
        if (max === stats.negative) return getSentimentLabel('NEGATIVE');
        return getSentimentLabel('NEUTRAL');
    };

    const screenWidth = Dimensions.get('window').width;
    const chartWidth = screenWidth - (Spacing.lg * 2);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <SegmentedButtons
                    value={weekOffset.toString()}
                    onValueChange={(value) => setWeekOffset(parseInt(value))}
                    buttons={[
                        { value: '-1', label: 'Geçen Hafta' },
                        { value: '0', label: 'Bu Hafta' },
                    ]}
                    style={styles.segmentedButtons}
                />
            </View>

            <Card style={styles.statsCard}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.cardTitle}>
                        📊 {Messages.label.weeklyStats}
                    </Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text variant="headlineMedium" style={styles.statNumber}>
                                {stats.total}
                            </Text>
                            <Text variant="bodyMedium" style={styles.statLabel}>
                                {Messages.label.totalEntries}
                            </Text>
                        </View>

                        <View style={styles.statItem}>
                            <Text variant="headlineMedium" style={styles.statNumber}>
                                {getMostCommonSentiment()}
                            </Text>
                            <Text variant="bodyMedium" style={styles.statLabel}>
                                En Yaygın Duygu
                            </Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>

            {stats.total > 0 && (
                <>
                    <Card style={styles.chartCard}>
                        <Card.Content>
                            <Text variant="titleMedium" style={styles.cardTitle}>
                                Duygu Dağılımı
                            </Text>

                            <View style={styles.barChart}>
                                {stats.positive > 0 && (
                                    <View style={styles.barContainer}>
                                        <View
                                            style={[
                                                styles.bar,
                                                {
                                                    width: `${getPercentage(stats.positive)}%` as any,
                                                    backgroundColor: getSentimentColor('POSITIVE'),
                                                },
                                            ]}
                                        >
                                            <Text style={styles.barLabel}>
                                                {getSentimentLabel('POSITIVE')} ({stats.positive})
                                            </Text>
                                        </View>
                                        <Text style={styles.percentage}>{getPercentage(stats.positive)}%</Text>
                                    </View>
                                )}

                                {stats.neutral > 0 && (
                                    <View style={styles.barContainer}>
                                        <View
                                            style={[
                                                styles.bar,
                                                {
                                                    width: `${getPercentage(stats.neutral)}%` as any,
                                                    backgroundColor: getSentimentColor('NEUTRAL'),
                                                },
                                            ]}
                                        >
                                            <Text style={styles.barLabel}>
                                                {getSentimentLabel('NEUTRAL')} ({stats.neutral})
                                            </Text>
                                        </View>
                                        <Text style={styles.percentage}>{getPercentage(stats.neutral)}%</Text>
                                    </View>
                                )}

                                {stats.negative > 0 && (
                                    <View style={styles.barContainer}>
                                        <View
                                            style={[
                                                styles.bar,
                                                {
                                                    width: `${getPercentage(stats.negative)}%` as any,
                                                    backgroundColor: getSentimentColor('NEGATIVE'),
                                                },
                                            ]}
                                        >
                                            <Text style={styles.barLabel}>
                                                {getSentimentLabel('NEGATIVE')} ({stats.negative})
                                            </Text>
                                        </View>
                                        <Text style={styles.percentage}>{getPercentage(stats.negative)}%</Text>
                                    </View>
                                )}
                            </View>
                        </Card.Content>
                    </Card>

                    <Text variant="titleMedium" style={styles.sectionTitle}>
                        Bu Haftanın Kayıtları
                    </Text>

                    {stats.entries.map((entry) => (
                        <EntryCard key={entry.id} entry={entry} />
                    ))}
                </>
            )}

            {stats.total === 0 && !loading && (
                <Card style={styles.emptyCard}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.emptyText}>
                            {Messages.empty.noWeeklyData}
                        </Text>
                    </Card.Content>
                </Card>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundSecondary,
        padding: Spacing.md,
    },
    header: {
        marginBottom: Spacing.md,
    },
    segmentedButtons: {
        backgroundColor: Colors.background,
    },
    statsCard: {
        marginBottom: Spacing.md,
        borderRadius: BorderRadius.lg,
    },
    chartCard: {
        marginBottom: Spacing.md,
        borderRadius: BorderRadius.lg,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: Spacing.md,
        color: Colors.text,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Spacing.sm,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontWeight: 'bold',
        color: Colors.primary,
    },
    statLabel: {
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
    },
    barChart: {
        marginTop: Spacing.sm,
    },
    barContainer: {
        marginBottom: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bar: {
        minWidth: 100,
        height: 40,
        borderRadius: BorderRadius.sm,
        justifyContent: 'center',
        paddingHorizontal: Spacing.sm,
    },
    barLabel: {
        color: Colors.text,
        fontWeight: '600',
        fontSize: 12,
    },
    percentage: {
        marginLeft: Spacing.sm,
        color: Colors.textSecondary,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginTop: Spacing.lg,
        marginBottom: Spacing.md,
        color: Colors.text,
    },
    emptyCard: {
        marginTop: Spacing.xl,
        borderRadius: BorderRadius.lg,
    },
    emptyText: {
        textAlign: 'center',
        color: Colors.textSecondary,
    },
});

export default WeeklySummaryScreen;
