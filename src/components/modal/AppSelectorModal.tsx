import { BottomSheetFlatList, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../assets/images/imgs';
import { COLORS, RADIUS, SPACING, STRINGS, TYPOGRAPHY } from '../../constants';
import { ModalHeader } from './../common';
import CommonBottomSheet, { RBSheetRefType } from './CommonBottomSheet';

export interface App {
  id: string;
  name: string;
  icon: number;
}

interface AppSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectApp: (app: App) => void;
  selectedAppId?: string;
}

const APPS_DATA: App[] = [
  { id: '1', name: 'Netflix', icon: Images.netflix },
  { id: '2', name: 'Spotify', icon: Images.spotify },
  { id: '3', name: 'New York Times', icon: Images.new_york_times },
  { id: '4', name: 'Wall Street Journal', icon: Images.wall_street },
  { id: '5', name: 'Hulu', icon: Images.hulu },
  { id: '6', name: 'Apple', icon: Images.apple },
  { id: '7', name: 'Amazon', icon: Images.amazon },
];

export const AppSelectorModal: React.FC<AppSelectorModalProps> = ({
  visible,
  onClose,
  onSelectApp,
  selectedAppId,
}) => {
  const bottomSheetRef = useRef<RBSheetRefType>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.openBSSheet();
      // Small delay to ensure bottom sheet is opened before focusing

    } else {
      bottomSheetRef.current?.closeBSSheet();
      Keyboard.dismiss();
    }
  }, [visible]);

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) {
      return APPS_DATA;
    }
    return APPS_DATA.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleSelectApp = useCallback((app: App) => {
    onSelectApp(app);
    setSearchQuery('');
    onClose();
  }, [onSelectApp, onClose]);

  const handleDone = useCallback(() => {
    setSearchQuery('');
    onClose();
  }, [onClose]);

  const renderAppItem = useCallback(({ item }: { item: App }) => {
    const isSelected = item.id === selectedAppId;

    return (
      <TouchableOpacity
        style={styles.appItem}
        onPress={() => handleSelectApp(item)}
        activeOpacity={0.7}
      >
        <Image source={item.icon} style={styles.appIconContainer} />

        <Text style={styles.appName}>{item.name}</Text>
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }, [selectedAppId, handleSelectApp]);

  const renderListHeader = () => (
    <View style={styles.searchContainer}>
      {/* <DragIndicator /> */}
      <ModalHeader title={STRINGS.app} onDone={handleDone} />
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <BottomSheetTextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder={STRINGS.search}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.textSecondary}
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="search"
            enablesReturnKeyAutomatically={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.clearButton}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const ListHeaderComponent = useMemo(() => renderListHeader(), [searchQuery, handleDone]);

  const renderItemSeparator = useCallback(() => <View style={styles.separator} />, []);

  return (
    <CommonBottomSheet ref={bottomSheetRef} snapPoints={['65%']} onDismiss={onClose}>
      <BottomSheetFlatList
        data={filteredApps}
        renderItem={renderAppItem}
        keyExtractor={(item: App) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={renderItemSeparator}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        removeClippedSubviews={false}
      />
    </CommonBottomSheet>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: SPACING.lg,
    flex: 1,
    backgroundColor: COLORS.backgroundWhite,
  },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.backgroundWhite,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundWhite,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.regular,
    color: COLORS.textPrimary,
    padding: 0,
  },
  clearButton: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.backgroundWhite,
  },
  appIconContainer: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.xl,

    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  appIcon: {
    fontSize: 24,
  },
  appName: {
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
