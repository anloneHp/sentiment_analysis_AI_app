import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Colors, Spacing } from '../constants/theme';

interface LoadingOverlayProps {
    visible: boolean;
    message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, message }) => {
    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    {message && (
                        <Text variant="bodyLarge" style={styles.message}>
                            {message}
                        </Text>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: Colors.background,
        padding: Spacing.xl,
        borderRadius: 12,
        alignItems: 'center',
        minWidth: 200,
    },
    message: {
        marginTop: Spacing.md,
        color: Colors.text,
        textAlign: 'center',
    },
});

export default LoadingOverlay;
