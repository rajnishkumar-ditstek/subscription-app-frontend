import { EditSubscriptionScreen } from '@/src/screens/EditSubscription';
import { EditSubscriptionProvider } from '@/src/screens/EditSubscription/EditSubscriptionContext';

export default function EditSubscription() {
  return (
    <EditSubscriptionProvider>
      <EditSubscriptionScreen />
    </EditSubscriptionProvider>
  );
}
