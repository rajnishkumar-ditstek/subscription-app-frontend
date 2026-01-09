import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { COLORS, SPACING, STRINGS } from '../../constants';
import { ModalHeader } from './../common';
import CommonBottomSheet, { RBSheetRefType } from './CommonBottomSheet';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (date: Date) => void;
  initialDate?: Date;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onSave,
  initialDate = new Date(),
}) => {
  const bottomSheetRef = useRef<RBSheetRefType>(null);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.openBSSheet();
      setSelectedDate(initialDate);
    } else {
      bottomSheetRef.current?.closeBSSheet();
    }
  }, [visible, initialDate]);

  const handleDone = () => {
    onSave(selectedDate);
    onClose();
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set' && date) {
        onSave(date);
      }
      onClose();
    } else if (date) {
      setSelectedDate(date);
    }
  };

  if (Platform.OS === 'android' && visible) {
    return (
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />
    );
  }

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <CommonBottomSheet
      ref={bottomSheetRef}
      snapPoints={['35%']}
      onDismiss={onClose}
      enableContentPanningGesture={false}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* <DragIndicator /> */}
        <ModalHeader title={STRINGS.startDate} onDone={handleDone} />

        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            dateFormat="day month year"
            onChange={handleDateChange}
            textColor={COLORS.textPrimary}
            style={styles.datePicker}
          />
        </View>
      </BottomSheetScrollView>
    </CommonBottomSheet>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: COLORS.backgroundWhite,
    paddingVertical: SPACING.sm,
  },
  datePicker: {
    height: 200,
  },
  scrollContent: {
    paddingBottom: SPACING.lg,

    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.backgroundWhite,
  },
});
