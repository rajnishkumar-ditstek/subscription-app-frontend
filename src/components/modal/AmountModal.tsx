import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING, STRINGS, TYPOGRAPHY } from '../../constants';
import { ModalHeader } from './../common';
import CommonBottomSheet, { RBSheetRefType } from './CommonBottomSheet';

interface AmountModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (amount: string) => void;
  initialAmount?: string;
}

export const AmountModal: React.FC<AmountModalProps> = ({
  visible,
  onClose,
  onSave,
  initialAmount = '0',
}) => {
  const bottomSheetRef = useRef<RBSheetRefType>(null);
  const [amount, setAmount] = useState(initialAmount);

  useEffect(() => {
    if (visible) {
      setAmount(initialAmount);
      bottomSheetRef.current?.openBSSheet();
    } else {
      bottomSheetRef.current?.closeBSSheet();
    }
  }, [visible]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      bottomSheetRef.current?.snapToIndex(1);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      bottomSheetRef.current?.snapToIndex(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleDone = () => {
    onSave(amount);
    onClose();
  };

  const handleAmountChange = (text: string) => {
    // Allow only numbers and one decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');

    // Prevent multiple decimal points
    if (parts.length > 2) {
      return;
    }

    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      return;
    }

    setAmount(cleaned);
  };

  return (
    <CommonBottomSheet
      ref={bottomSheetRef}
      snapPoints={['20%', '55%']}
      enableContentPanningGesture={false}
      onDismiss={onClose}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        <ModalHeader title={STRINGS.amount} onDone={handleDone} />

        <View style={styles.contentContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.dollarSign}>$</Text>
            <BottomSheetTextInput
              style={styles.input}
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={COLORS.textPlaceholder}

              selectTextOnFocus={true}
              blurOnSubmit={false}
              returnKeyType="done"
            />
          </View>
        </View>
      </BottomSheetScrollView>
    </CommonBottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,

  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    backgroundColor: COLORS.backgroundWhite,
    flex: 1
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundWhite,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 50,
  },
  dollarSign: {
    fontSize: 16,
    color: '#636A79',
    marginRight: SPACING.md,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    padding: 0,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    textAlignVertical: 'center',
  },
});
