import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import AIService from '../services/AIService';
import { DailyEntry } from '../types';
import { useNavigation } from '@react-navigation/native';
import { useEntries } from '../context/EntriesContext';
import SentimentCard from '../components/SentimentCard';
import LoadingOverlay from '../components/LoadingOverlay';
import { Colors, Spacing } from '../constants/theme';
import { Messages } from '../constants/messages';

const HomeScreen = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DailyEntry | null>(null);
    const [error, setError] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const navigation = useNavigation();
    const { addEntry } = useEntries();

    const handleAnalyze = async () => {
        if (!text.trim()) {
            setError(Messages.error.emptyInput);
            setSnackbarVisible(true);
            return;
        }

        Keyboard.dismiss();
        setLoading(true);
        setResult(null);
        setError('');

        try {
            const analysis = await AIService.analyzeEntry(text);

            const newEntry: DailyEntry = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                text: text,
                sentiment: analysis.sentiment,
                summary: analysis.summary,
                suggestion: analysis.suggestion
            };

            await addEntry(newEntry);
            setResult(newEntry);
            setText('');
            setSnackbarVisible(true);
        } catch (error) {
            console.error(error);
            setError(Messages.error.generic);
            setSnackbarVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const getBackgroundColor = () => {
        if (!result) return Colors.background;
        switch (result.sentiment) {
            case 'POSITIVE': return Colors.sentimentPositive;
            case 'NEGATIVE': return Colors.sentimentNegative;
            case 'NEUTRAL': return Colors.sentimentNeutral;
            default: return Colors.background;
        }
    };

    return (
        <>
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor: getBackgroundColor() }]}>
                <Text variant="headlineMedium" style={styles.title}>
                    Bugün nasıl hissediyorsun?
                </Text>

                <TextInput
                    label={Messages.placeholder.entryInput}
                    value={text}
                    onChangeText={setText}
                    mode="outlined"
                    multiline
                    numberOfLines={5}
                    style={styles.input}
                    outlineColor={Colors.border}
                    activeOutlineColor={Colors.primary}
                />

                <Button
                    mode="contained"
                    onPress={handleAnalyze}
                    loading={loading}
                    disabled={loading || !text.trim()}
                    style={styles.button}
                    buttonColor={Colors.primary}
                >
                    {Messages.button.analyze}
                </Button>

                {result && (
                    <SentimentCard
                        sentiment={result.sentiment}
                        summary={result.summary}
                        suggestion={result.suggestion}
                        style={styles.resultCard}
                    />
                )}

                <View style={styles.navigationButtons}>
                    <Button
                        mode="outlined"
                        onPress={() => navigation.navigate('History' as never)}
                        style={styles.navButton}
                        icon="history"
                    >
                        {Messages.button.viewHistory}
                    </Button>

                    <Button
                        mode="outlined"
                        onPress={() => navigation.navigate('WeeklySummary' as never)}
                        style={styles.navButton}
                        icon="chart-line"
                    >
                        {Messages.button.viewWeeklySummary}
                    </Button>
                </View>
            </ScrollView>

            <LoadingOverlay visible={loading} message={Messages.loading.analyzing} />

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                action={{
                    label: 'Tamam',
                    onPress: () => setSnackbarVisible(false),
                }}
            >
                {error || Messages.success.entrySaved}
            </Snackbar>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: Spacing.lg,
        backgroundColor: Colors.background,
    },
    title: {
        marginBottom: Spacing.lg,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.text,
    },
    input: {
        marginBottom: Spacing.md,
        backgroundColor: Colors.background,
    },
    button: {
        marginTop: Spacing.sm,
        paddingVertical: 6,
    },
    resultCard: {
        marginTop: Spacing.lg,
    },
    navigationButtons: {
        marginTop: Spacing.xl,
        gap: Spacing.md,
    },
    navButton: {
        marginBottom: Spacing.sm,
    },
});

export default HomeScreen;
