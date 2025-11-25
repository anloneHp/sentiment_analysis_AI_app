import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { DailyEntry } from '../types';
import { getSentimentColor, getSentimentEmoji } from '../utils/sentimentUtils';
import { formatDate, formatTime } from '../utils/dateUtils';
import { Colors, Spacing, BorderRadius, FontSizes } from '../constants/theme';

interface EntryCardProps {
    entry: DailyEntry;
    onPress?: (entry: DailyEntry) => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onPress }) => {
    const backgroundColor = getSentimentColor(entry.sentiment);
    const emoji = getSentimentEmoji(entry.sentiment);

    const handlePress = () => {
        if (onPress) {
            onPress(entry);
        }
    };

    const CardWrapper = onPress ? TouchableOpacity : View;

    return (
        <CardWrapper onPress={handlePress} activeOpacity={0.7}>
            <Card style={[styles.card, { backgroundColor }]}>
                <Card.Content>
                    <View style={styles.header}>
                        <Text variant="headlineSmall" style={styles.emoji}>
                            {emoji}
                        </Text>
                        <View style={styles.dateContainer}>
                            <Text variant="bodySmall" style={styles.date}>
                                {formatDate(entry.date)}
                            </Text>
                            <Text variant="bodySmall" style={styles.time}>
                                {formatTime(entry.date)}
                            </Text>
                        </View>
                    </View>

                    <Text variant="bodyMedium" numberOfLines={2} style={styles.text}>
                        "{entry.text}"
                    </Text>

                    <Text variant="bodySmall" style={styles.summary} numberOfLines={1}>
                        💭 {entry.summary}
                    </Text>
                </Card.Content>
            </Card>
        </CardWrapper>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: Spacing.md,
        borderRadius: BorderRadius.md,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    emoji: {
        marginRight: Spacing.sm,
    },
    dateContainer: {
        flex: 1,
    },
    date: {
        color: Colors.textSecondary,
        fontSize: FontSizes.sm,
    },
    time: {
        color: Colors.textLight,
        fontSize: FontSizes.xs,
    },
    text: {
        fontStyle: 'italic',
        marginBottom: Spacing.sm,
        color: Colors.text,
    },
    summary: {
        fontWeight: '600',
        color: Colors.textSecondary,
    },
});

export default EntryCard;
