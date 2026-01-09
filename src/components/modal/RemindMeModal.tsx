import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants';
import { ModalHeader } from './../common';
import CommonBottomSheet, { RBSheetRefType } from './CommonBottomSheet';

export interface RemindMe {
  id: string;
  name: string;
}

interface RemindMeModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectReminder: (reminder: RemindMe) => void;
  selectedReminderId?: string;
}

const REMINDERS_DATA: RemindMe[] = [
  { id: '1', name: 'Same day' },
  { id: '2', name: '1 day before' },
  { id: '3', name: '2 days before' },
  { id: '4', name: '3 days before' },
  { id: '5', name: '1 week before' },
  { id: '6', name: '2 weeks before' },
];

export const RemindMeModal: React.FC<RemindMeModalProps> = ({
  visible,
  onClose,
  onSelectReminder,
  selectedReminderId,
}) => {
  const bottomSheetRef = useRef<RBSheetRefType>(null);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.openBSSheet();
    } else {
      bottomSheetRef.current?.closeBSSheet();
    }
  }, [visible]);

  const handleSelectReminder = (reminder: RemindMe) => {
    onSelectReminder(reminder);
    onClose();
  };

  const renderReminderItem = ({ item }: { item: RemindMe }) => {
    const isSelected = item.id === selectedReminderId;

    return (
      <TouchableOpacity
        style={styles.reminderItem}
        onPress={() => handleSelectReminder(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.reminderName}>{item.name}</Text>
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
      <ModalHeader title="Remind Me" onDone={onClose} />
    </>
  );

  const renderItemSeparator = () => <View style={styles.separator} />;

  return (
    <CommonBottomSheet ref={bottomSheetRef} snapPoints={['42%']} onDismiss={onClose}>
      <BottomSheetFlatList
        data={REMINDERS_DATA}
        renderItem={renderReminderItem}
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
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.backgroundWhite,
  },
  reminderName: {
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
