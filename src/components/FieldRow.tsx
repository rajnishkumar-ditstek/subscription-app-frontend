import React, { memo } from 'react';
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../assets/images/imgs';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants';

/**
 * Props for the FieldRow component
 */
interface FieldRowProps {
  /** Label text for the field */
  label: string;
  /** Current value to display */
  value?: string;
  /** Optional icon to display before the value */
  icon?: React.ReactNode;
  /** Callback when field is pressed */
  onPress?: () => void;
  /** Whether to show arrow indicator */
  showArrow?: boolean;
  /** Whether this is a switch field */
  isSwitch?: boolean;
  /** Current switch value (if isSwitch is true) */
  switchValue?: boolean;
  /** Callback when switch value changes */
  onSwitchChange?: (value: boolean) => void;
  /** Whether this is a date field */
  isDate?: boolean;
}

/**
 * Reusable row component for displaying form fields
 * Supports text fields, switches, and date fields
 *
 * @example
 * ```tsx
 * <FieldRow
 *   label="Amount"
 *   value="$50.00"
 *   onPress={handleAmountPress}
 * />
 * ```
 */
export const FieldRow = memo<FieldRowProps>(
  ({
    label,
    value,
    icon,
    onPress,
    showArrow = true,
    isSwitch = false,
    switchValue = false,
    onSwitchChange,
    isDate = false,
  }) => {
    const content = (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>

        {isSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: '#E5E5EA', true: '#34C759' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E5E5EA"
            accessible={true}
            accessibilityRole="switch"
            accessibilityLabel={`${label} switch`}
            accessibilityState={{ checked: switchValue }}
            accessibilityHint={`Toggle ${label} on or off`}
          />
        ) : (
          <View style={[styles.valueContainer, isDate && styles.date]}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text style={styles.value}>{value}</Text>
            {showArrow && onPress && !isDate && (
              <Image style={styles.unfold} source={Images.unfold_more} accessible={false} />
            )}
          </View>
        )}
      </View>
    );

    if (onPress && !isSwitch) {
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${label}: ${value}`}
          accessibilityHint={`Tap to change ${label}`}
        >
          {content}
        </TouchableOpacity>
      );
    }

    return content;
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.backgroundWhite,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.separator,
    height: 65,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.regular - 1,
    color: '#636A79',
    fontWeight: TYPOGRAPHY.fontWeight.regular,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconContainer: {
    marginRight: SPACING.xs,
  },
  value: {
    fontSize: TYPOGRAPHY.fontSize.regular - 1,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.fontWeight.regular,
  },
  arrow: {
    fontSize: 24,
    color: COLORS.textPlaceholder,
    marginLeft: SPACING.xs,
  },
  date: {
    backgroundColor: COLORS.separator,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 5,
    borderRadius: 6,
  },
  unfold: {
    width: 18,
    height: 18,
  },
});
