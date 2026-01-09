import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../../constants';

export const DragIndicator: React.FC = () => {
  return <View style={styles.dragIndicator} />;
};

const styles = StyleSheet.create({
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.dragIndicator,
    borderRadius: RADIUS.sm / 2,
    alignSelf: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
});
