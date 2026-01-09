import { Image } from 'expo-image';
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../assets/images/imgs';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants';

/**
 * Props for the Header component
 */
interface HeaderProps {
    /** Title text to display in the center */
    title: string;
    /** Callback when back button is pressed */
    onBack?: () => void;
    /** Callback when save button is pressed */
    onSave?: () => void;
    /** Whether to show the save button */
    showSave?: boolean;
}

/**
 * Header component with back button, title, and optional save button
 * Used at the top of screens for navigation and actions
 *
 * @example
 * ```tsx
 * <Header
 *   title="Edit Subscription"
 *   onBack={handleBack}
 *   onSave={handleSave}
 * />
 * ```
 */
export const Header = memo<HeaderProps>(({ title, onBack, onSave, showSave = true }) => {
    return (
        <View style={styles.container} accessible={true} accessibilityRole="header">
            <TouchableOpacity
                style={styles.backButton}
                onPress={onBack}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                accessibilityHint="Navigate to previous screen"
            >
                <Image source={Images.button} style={styles.backIcon} />
            </TouchableOpacity>

            <Text style={styles.title} accessible={true} accessibilityRole="header">
                {title}
            </Text>

            {showSave ? (
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={onSave}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Save"
                    accessibilityHint="Save the subscription"
                >
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.saveButton} />
            )}
        </View>
    );
});

Header.displayName = 'Header';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        // backgroundColor: COLORS.backgroundWhite,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.separator,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    backIcon: {
        width: 44,
        height: 44,
    },
    title: {
        fontSize: TYPOGRAPHY.fontSize.regular,
        fontWeight: TYPOGRAPHY.fontWeight.semibold,
        color: COLORS.textPrimary,
        flex: 1,
        textAlign: 'center',
    },
    saveButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    saveText: {
        fontSize: TYPOGRAPHY.fontSize.regular,
        color: COLORS.primary,
        fontWeight: TYPOGRAPHY.fontWeight.regular,
    },
});
