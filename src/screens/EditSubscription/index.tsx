import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common';
import { FieldRow } from '../../components/FieldRow';
import { Header } from '../../components/Header';
import {
  AmountModal,
  AppSelectorModal,
  CategoryModal,
  DatePickerModal,
  FrequencyModal,
  RemindMeModal,
} from '../../components/modal';
import { SubscriptionCard } from '../../components/SubscriptionCard';
import { STRINGS } from '../../constants';
import { useEditSubscription } from './EditSubscriptionContext';
import { styles } from './styles';

export const EditSubscriptionScreen: React.FC = () => {
  const {
    isActive,
    selectedApp,
    amount,
    selectedCategory,
    startDate,
    selectedFrequency,
    selectedReminder,
    appModal,
    amountModal,
    categoryModal,
    dateModal,
    frequencyModal,
    reminderModal,
    handleBack,
    handleSave,
    handleDelete,
    handleSelectApp,
    handleSaveAmount,
    handleSelectCategory,
    handleSaveDate,
    handleSelectFrequency,
    handleSelectReminder,
    setIsActive,
    formattedDate,
    categoryIcon,
  } = useEditSubscription();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title={STRINGS.editSubscription} onBack={handleBack} onSave={handleSave} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} bounces={true}>
        <SubscriptionCard
          appName={selectedApp?.name || STRINGS.chooseApp}
          price={`$${amount}`}
          // onPress={appModal.open}
          image={selectedApp?.icon}
        />

        <View style={styles.fieldsContainer}>
          <FieldRow
            label={STRINGS.appLabel}
            value={selectedApp?.name || STRINGS.chooseApp}
            onPress={appModal.open}
          />
          <FieldRow label={STRINGS.amountLabel} value={`$${amount}`} onPress={amountModal.open} />
          <FieldRow
            label={STRINGS.categoryLabel}
            value={selectedCategory?.name || STRINGS.selectCategory}
            icon={
              categoryIcon ? <Image source={categoryIcon} style={styles.categoryIcon} /> : undefined
            }
            onPress={categoryModal.open}
          />
        </View>

        <View style={styles.detailsContainer}>
          <FieldRow
            label={STRINGS.startDateLabel}
            value={formattedDate}
            onPress={dateModal.open}
            isDate
          />
          <FieldRow
            label={STRINGS.frequencyLabel}
            value={selectedFrequency?.name || STRINGS.selectFrequency}
            onPress={frequencyModal.open}
          />
          <FieldRow
            label={STRINGS.remindMeLabel}
            value={selectedReminder?.name || STRINGS.selectReminder}
            onPress={reminderModal.open}
          />
          <FieldRow
            label={STRINGS.activeLabel}
            isSwitch
            switchValue={isActive}
            onSwitchChange={setIsActive}
          />
        </View>

        <Button
          title={STRINGS.delete}
          onPress={handleDelete}
          variant="destructive"
          style={styles.deleteButton}
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Modals */}
      <AppSelectorModal
        visible={appModal.visible}
        onClose={appModal.close}
        onSelectApp={handleSelectApp}
        selectedAppId={selectedApp?.id}
      />
      <AmountModal
        visible={amountModal.visible}
        onClose={amountModal.close}
        onSave={handleSaveAmount}
        initialAmount={amount}
      />
      <CategoryModal
        visible={categoryModal.visible}
        onClose={categoryModal.close}
        onSelectCategory={handleSelectCategory}
        selectedCategoryId={selectedCategory?.id}
      />
      <DatePickerModal
        visible={dateModal.visible}
        onClose={dateModal.close}
        onSave={handleSaveDate}
        initialDate={startDate}
      />
      <FrequencyModal
        visible={frequencyModal.visible}
        onClose={frequencyModal.close}
        onSelectFrequency={handleSelectFrequency}
        selectedFrequencyId={selectedFrequency?.id}
      />
      <RemindMeModal
        visible={reminderModal.visible}
        onClose={reminderModal.close}
        onSelectReminder={handleSelectReminder}
        selectedReminderId={selectedReminder?.id}
      />
    </SafeAreaView>
  );
};
