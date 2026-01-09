import { Button } from '@/src/components/common/Button';
import { STRINGS } from '@/src/constants';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export const HomeScreen = () => {
  const handleEditSubscription = () => {
    router.push('/edit-subscription');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{STRINGS.WELCOME_TITLE}</Text>
      <Button
        title={STRINGS.EDIT_SUBSCRIPTION}
        onPress={handleEditSubscription}
        variant="primary"
        style={styles.buttonEditSubscription}
      />
    </View>
  );
};
