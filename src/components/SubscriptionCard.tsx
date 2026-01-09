import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../constants';

/**
 * Props for the SubscriptionCard component
 */
interface SubscriptionCardProps {
    /** Display name of the subscription app */
    appName: string;
    /** Formatted price string (e.g., "$9.99 / month") */
    price: string;
    /** Whether to show a logo placeholder */
    logoPlaceholder?: boolean;
    /** Callback when card is pressed */
    onPress?: () => void;
    /** Image source for the app logo */
    image?: number;
}

/**
 * Card component to display subscription information
 *
 * Shows app logo, name, and pricing in a clean card layout.
 * Can be made interactive by providing an onPress handler.
 *
 * @example
 * ```tsx
 * <SubscriptionCard
 *   appName="Netflix"
 *   price="$15.99 / month"
 *   image={require('../assets/netflix.png')}
 *   onPress={() => navigation.navigate('Details')}
 * />
 * ```
 */
export const SubscriptionCard = memo<SubscriptionCardProps>(
    ({ appName, price, logoPlaceholder = true, onPress, image }) => {
        const content = (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoPlaceholder}>
                        <Image source={image} style={{ width: 60, height: 60, borderRadius: 30 }} />
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.appName}>{appName}</Text>
                    <Text style={styles.price}>{price}</Text>
                </View>
            </View>
        );

        if (onPress) {
            return (
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={`View ${appName} subscription details`}
                    accessibilityHint={`Costs ${price}`}
                >
                    {content}
                </TouchableOpacity>
            );
        }

        return content;
    }
);

SubscriptionCard.displayName = 'SubscriptionCard';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.xl,
        paddingHorizontal: SPACING.lg,
        backgroundColor: COLORS.backgroundWhite,
        marginHorizontal: SPACING.lg,
        marginTop: SPACING.lg,
        marginBottom: SPACING.sm,
        borderRadius: RADIUS.md,
        shadowColor: COLORS.textPrimary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    logoContainer: {
        marginRight: SPACING.lg,
    },
    logoPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: RADIUS.xxl,
        backgroundColor: COLORS.separator,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 28,
    },
    infoContainer: {
        flex: 1,
    },
    appName: {
        fontSize: 18,
        color: COLORS.textPrimary,
        marginBottom: 4,
        fontWeight: TYPOGRAPHY.fontWeight.regular,
    },
    price: {
        fontSize: TYPOGRAPHY.fontSize.small,
        color: COLORS.textSecondary,
    },
});
