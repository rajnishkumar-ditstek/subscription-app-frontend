import { router } from 'expo-router';
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Alert } from 'react-native';
import { Images } from '../../assets/images/imgs';
import type { App, Category, Frequency, RemindMe } from '../../components/modal';
import { STRINGS } from '../../constants';
import { useModalState } from '../../hooks/useModalState';
import { storageService } from '../../services/storage';
import { formatDate } from '../../utils/dateFormatter';
import { validateSubscriptionForm } from '../../utils/validation';

interface EditSubscriptionContextType {
    // State
    isActive: boolean;
    selectedApp: App | null;
    amount: string;
    selectedCategory: Category | null;
    startDate: Date;
    selectedFrequency: Frequency | null;
    selectedReminder: RemindMe | null;
    isLoading: boolean;
    error: string | null;

    // Modal states
    appModal: ReturnType<typeof useModalState>;
    amountModal: ReturnType<typeof useModalState>;
    categoryModal: ReturnType<typeof useModalState>;
    dateModal: ReturnType<typeof useModalState>;
    frequencyModal: ReturnType<typeof useModalState>;
    reminderModal: ReturnType<typeof useModalState>;

    // Handlers
    handleBack: () => void;
    handleSave: () => void;
    handleDelete: () => void;
    handleSelectApp: (app: App) => void;
    handleSaveAmount: (newAmount: string) => void;
    handleSelectCategory: (category: Category) => void;
    handleSaveDate: (date: Date) => void;
    handleSelectFrequency: (frequency: Frequency) => void;
    handleSelectReminder: (reminder: RemindMe) => void;
    setIsActive: (value: boolean) => void;

    // Memoized values
    formattedDate: string;
    categoryIcon: number | undefined;
}

const EditSubscriptionContext = createContext<EditSubscriptionContextType | undefined>(undefined);

interface EditSubscriptionProviderProps {
    children: ReactNode;
}

export const EditSubscriptionProvider: React.FC<EditSubscriptionProviderProps> = ({ children }) => {
    // State
    const [isActive, setIsActive] = useState(true);
    const [selectedApp, setSelectedApp] = useState<App | null>({
        id: '1',
        name: 'Netflix',
        icon: Images.netflix,
    });
    const [amount, setAmount] = useState('50.00');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>({
        id: '4',
        name: STRINGS.defaultCategory,
        icon: Images.monetization_on,
    });
    const [startDate, setStartDate] = useState(new Date(2025, 3, 12));
    const [selectedFrequency, setSelectedFrequency] = useState<Frequency | null>({
        id: '1',
        name: STRINGS.defaultFrequency,
    });
    const [selectedReminder, setSelectedReminder] = useState<RemindMe | null>({
        id: '3',
        name: STRINGS.defaultReminder,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Modal states
    const appModal = useModalState();
    const amountModal = useModalState();
    const categoryModal = useModalState();
    const dateModal = useModalState();
    const frequencyModal = useModalState();
    const reminderModal = useModalState();

    /**
     * Load saved subscription data from AsyncStorage on component mount
     * This ensures data persists across app restarts
     */
    useEffect(() => {
        const loadSavedData = async () => {
            try {
                setIsLoading(true);
                const savedData = await storageService.loadSubscription();

                if (savedData) {
                    // Restore all form fields from saved data
                    setIsActive(savedData.isActive);
                    setSelectedApp(savedData.selectedApp);
                    setAmount(savedData.amount);
                    setSelectedCategory(savedData.selectedCategory);
                    setStartDate(new Date(savedData.startDate));
                    setSelectedFrequency(savedData.selectedFrequency);
                    setSelectedReminder(savedData.selectedReminder);
                }
            } catch (err) {
                console.error('Error loading saved data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadSavedData();
    }, []);

    // Handlers - memoized with useCallback
    const handleBack = useCallback(() => {
        router.back();
    }, []);

    /**
     * Save subscription with validation
     * Validates all required fields before persisting to AsyncStorage
     */
    const handleSave = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Step 1: Validate form before saving
            const validation = validateSubscriptionForm({
                selectedApp,
                amount,
                selectedCategory,
                selectedFrequency,
            });

            // Step 2: Show validation errors if any
            if (!validation.isValid) {
                Alert.alert('Validation Error', validation.error || 'Please fill all required fields');
                setIsLoading(false);
                return;
            }

            // Step 3: Save subscription data to AsyncStorage
            await storageService.saveSubscription({
                isActive,
                selectedApp,
                amount,
                selectedCategory,
                startDate: startDate.toISOString(),
                selectedFrequency,
                selectedReminder,
            });

            Alert.alert('Success', 'Subscription saved successfully!');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to save subscription';
            setError(errorMessage);
            Alert.alert('Error', errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [
        selectedApp,
        amount,
        selectedCategory,
        startDate,
        selectedFrequency,
        selectedReminder,
        isActive,
    ]);

    /**
     * Delete subscription with confirmation
     * Shows alert dialog before removing data from AsyncStorage
     */
    const handleDelete = useCallback(async () => {
        Alert.alert(STRINGS.deleteSubscriptionTitle, STRINGS.deleteSubscriptionMessage, [
            { text: STRINGS.cancel, style: 'cancel' },
            {
                text: STRINGS.delete,
                style: 'destructive',
                onPress: async () => {
                    try {
                        setIsLoading(true);
                        setError(null);

                        // Remove subscription data from AsyncStorage
                        await storageService.deleteSubscription();

                        Alert.alert('Success', 'Subscription deleted successfully!');
                        router.back();
                    } catch (err) {
                        const errorMessage =
                            err instanceof Error ? err.message : 'Failed to delete subscription';
                        setError(errorMessage);
                        Alert.alert('Error', errorMessage);
                    } finally {
                        setIsLoading(false);
                    }
                },
            },
        ]);
    }, []);

    const handleSelectApp = useCallback((app: App) => {
        setSelectedApp(app);
    }, []);

    const handleSaveAmount = useCallback((newAmount: string) => {
        setAmount(newAmount);
    }, []);

    const handleSelectCategory = useCallback((category: Category) => {
        setSelectedCategory(category);
    }, []);

    const handleSaveDate = useCallback((date: Date) => {
        setStartDate(date);
    }, []);

    const handleSelectFrequency = useCallback((frequency: Frequency) => {
        setSelectedFrequency(frequency);
    }, []);

    const handleSelectReminder = useCallback((reminder: RemindMe) => {
        setSelectedReminder(reminder);
    }, []);

    // Memoized values
    const formattedDate = useMemo(() => formatDate(startDate), [startDate]);
    const categoryIcon = useMemo(() => selectedCategory?.icon, [selectedCategory?.icon]);

    const value = useMemo(
        () => ({
            isActive,
            selectedApp,
            amount,
            selectedCategory,
            startDate,
            selectedFrequency,
            selectedReminder,
            isLoading,
            error,
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
        }),
        [
            isActive,
            selectedApp,
            amount,
            selectedCategory,
            startDate,
            selectedFrequency,
            selectedReminder,
            isLoading,
            error,
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
            formattedDate,
            categoryIcon,
        ]
    );

    return (
        <EditSubscriptionContext.Provider value={value}>{children}</EditSubscriptionContext.Provider>
    );
};

export const useEditSubscription = () => {
    const context = useContext(EditSubscriptionContext);
    if (context === undefined) {
        throw new Error('useEditSubscription must be used within EditSubscriptionProvider');
    }
    return context;
};
