import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { getSentimentColor, getSentimentEmoji, getSentimentLabel, SentimentType } from '../utils/sentimentUtils';
import { Colors, Spacing, BorderRadius } from '../constants/theme';
import { Messages } from '../constants/messages';

interface SentimentCardProps {
    sentiment: SentimentType;
    summary: string;
    suggestion: string;
    style?: ViewStyle;
}

const SentimentCard: React.FC<SentimentCardProps> = ({ sentiment, summary, suggestion, style }) => {
    const backgroundColor = getSentimentColor(sentiment);
    const emoji = getSentimentEmoji(sentiment);
    const label = getSentimentLabel(sentiment);

    return (
        <Card style={[styles.card, { backgroundColor }, style]}>
            <Card.Content>
                <View style={styles.header}>
                    <Text variant="headlineMedium" style={styles.emoji}>
                        {emoji}
                    </Text>
                    <Text variant="titleLarge" style={styles.title}>
                        {Messages.label.sentiment}: {label}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text variant="labelLarge" style={styles.label}>
                        {Messages.label.summary}
                    </Text>
                    <Text variant="bodyLarge" style={styles.text}>
                        {summary}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text variant="labelLarge" style={styles.label}>
                        {Messages.label.suggestion}
                    </Text>
                    <Text variant="bodyLarge" style={styles.text}>
                        {suggestion}
                    </Text>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: BorderRadius.lg,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    emoji: {
        marginRight: Spacing.sm,
    },
    title: {
        fontWeight: 'bold',
        flex: 1,
    },
    section: {
        marginTop: Spacing.md,
    },
    label: {
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
        fontWeight: '600',
    },
    text: {
        color: Colors.text,
        lineHeight: 24,
    },
});

export default SentimentCard;
