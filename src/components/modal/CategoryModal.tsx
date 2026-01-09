import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../assets/images/imgs';
import { COLORS, RADIUS, SPACING, STRINGS, TYPOGRAPHY } from '../../constants';
import { ModalHeader } from './../common';
import CommonBottomSheet, { RBSheetRefType } from './CommonBottomSheet';

export interface Category {
  id: string;
  name: string;
  icon: number;
}

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (category: Category) => void;
  selectedCategoryId?: string;
}

const CATEGORIES_DATA: Category[] = [
  { id: '1', name: 'Subscription', icon: Images.subscription },
  { id: '2', name: 'Utility', icon: Images.utility },
  { id: '3', name: 'Card Payment', icon: Images.credit_card },
  { id: '4', name: 'Loan', icon: Images.monetization_on },
  { id: '5', name: 'Rent', icon: Images.rent },
];

export const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  onClose,
  onSelectCategory,
  selectedCategoryId,
}) => {
  const bottomSheetRef = useRef<RBSheetRefType>(null);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.openBSSheet();
    } else {
      bottomSheetRef.current?.closeBSSheet();
    }
  }, [visible]);

  const handleSelectCategory = (category: Category) => {
    onSelectCategory(category);
    onClose();
  };

  const renderCategoryItem = ({ item }: { item: Category }) => {
    const isSelected = item.id === selectedCategoryId;

    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleSelectCategory(item)}
        activeOpacity={0.7}
      >
        <View style={styles.categoryIconContainer}>
          <Image source={item.icon} style={styles.categoryIcon} />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
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
      <ModalHeader title={STRINGS.category} onDone={onClose} />
    </>
  );

  const renderItemSeparator = () => <View style={styles.separator} />;

  return (
    <CommonBottomSheet ref={bottomSheetRef} snapPoints={['48%']} onDismiss={onClose}>
      <BottomSheetFlatList
        data={CATEGORIES_DATA}
        renderItem={renderCategoryItem}
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
    flex: 1
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.backgroundWhite,
  },
  categoryIconContainer: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.separator,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  categoryIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  categoryName: {
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
    marginLeft: 72,
  },
});
