import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

/**
 * Props for the ModalHeader component
 */
interface ModalHeaderProps {
    /** Title text to display in the header */
    title: string;
    /** Callback when done button is pressed */
    onDone?: () => void;
    /** Whether to show the done button */
    showDoneButton?: boolean;
}

/**
 * Header component for bottom sheet modals
 *
 * Displays a title and optional done button for modal interactions.
 *
 * @example
 * ```tsx
 * <ModalHeader
 *   title="Select Amount"
 *   onDone={() => closeModal()}
 *   showDoneButton={true}
 * />
 * ```
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
    title,
    onDone,
    showDoneButton = true,
}) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <Text style={styles.headerTitle} accessibilityRole="header">
                    {title}
                </Text>
                {showDoneButton && onDone && (
                    <TouchableOpacity
                        style={styles.doneButton}
                        onPress={onDone}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel="Done"
                        accessibilityHint="Close this modal and apply changes"
                    >
                        <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        // backgroundColor: COLORS.background,
        paddingTop: SPACING.xs,
        // borderBottomWidth: 1,
        // borderBottomColor: COLORS.border,
        width: '100%',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: 5,
        position: 'relative',
    },
    headerTitle: {
        fontSize: TYPOGRAPHY.fontSize.regular,
        fontWeight: TYPOGRAPHY.fontWeight.semibold,
        color: COLORS.textPrimary,
        textAlign: 'center',
    },
    doneButton: {
        position: 'absolute',
        right: SPACING.lg,
        padding: SPACING.xs,
    },
    doneText: {
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: TYPOGRAPHY.fontWeight.regular,
    },
});
