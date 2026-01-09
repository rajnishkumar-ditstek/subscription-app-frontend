import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import { ModalHeader } from './../common';
import CommonBottomSheet, { RBSheetRefType } from './CommonBottomSheet';

export interface Frequency {
  id: string;
  name: string;
}

interface FrequencyModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectFrequency: (frequency: Frequency) => void;
  selectedFrequencyId?: string;
}

const FREQUENCIES_DATA: Frequency[] = [
  { id: '1', name: 'Weekly' },
  { id: '2', name: 'Monthly' },
  { id: '3', name: 'Anually' },
];

export const FrequencyModal: React.FC<FrequencyModalProps> = ({
  visible,
  onClose,
  onSelectFrequency,
  selectedFrequencyId,
}) => {
  const bottomSheetRef = useRef<RBSheetRefType>(null);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.openBSSheet();
    } else {
      bottomSheetRef.current?.closeBSSheet();
    }
  }, [visible]);

  const handleSelectFrequency = (frequency: Frequency) => {
    onSelectFrequency(frequency);
    onClose();
  };

  const renderFrequencyItem = ({ item }: { item: Frequency }) => {
    const isSelected = item.id === selectedFrequencyId;

    return (
      <TouchableOpacity
        style={styles.frequencyItem}
        onPress={() => handleSelectFrequency(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.frequencyName}>{item.name}</Text>
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderListHeader = () => (
    <>
      {/* <DragIndicator /> */}
      <ModalHeader title="Frequency" onDone={onClose} />
    </>
  );

  const renderItemSeparator = () => <View style={styles.separator} />;

  return (
    <CommonBottomSheet ref={bottomSheetRef} snapPoints={['25%']} onDismiss={onClose}>
      <BottomSheetFlatList
        data={FREQUENCIES_DATA}
        renderItem={renderFrequencyItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderListHeader}
        ItemSeparatorComponent={renderItemSeparator}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </CommonBottomSheet>
  );
};

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: COLORS.backgroundWhite,
    flex: 1,
  },
  frequencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.backgroundWhite,
  },
  frequencyName: {
    fontSize: TYPOGRAPHY.fontSize.regular,
    color: COLORS.textPrimary,
    flex: 1,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: COLORS.backgroundWhite,
    fontSize: 14,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.separator,
    marginLeft: SPACING.lg,
  },
});
