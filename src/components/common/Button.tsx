import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants';

/**
 * Props for the Button component
 */
interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** The text to display on the button */
  title: string;
  /** Callback function when button is pressed */
  onPress: () => void;
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'destructive';
  /** Additional custom styles */
  style?: ViewStyle;
  /** Accessibility hint for screen readers */
  accessibilityHint?: string;
}

/**
 * Reusable Button component with multiple variants
 *
 * @example
 * ```tsx
 * <Button
 *   title="Save"
 *   onPress={handleSave}
 *   variant="primary"
 *   accessibilityHint="Save your subscription"
 * />
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  accessibilityHint,
  ...rest
}) => {
  const getAccessibilityLabel = () => {
    if (variant === 'destructive') {
      return `${title} button. Warning: This action is destructive`;
    }
    return `${title} button`;
  };

  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      onPress={onPress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={getAccessibilityLabel()}
      accessibilityHint={accessibilityHint}
      {...rest}
    >
      <Text style={[styles.buttonText, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.lg,
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.backgroundWhite,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.backgroundWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  destructive: {
    backgroundColor: COLORS.backgroundWhite,
  },
  buttonText: {
    fontSize: TYPOGRAPHY.fontSize.regular,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  primaryText: {
    color: COLORS.backgroundWhite,
  },
  secondaryText: {
    color: COLORS.textPrimary,
  },
  destructiveText: {
    color: COLORS.destructive,
  },
});
