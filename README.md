# Subscription App - Expo Project 📱

A modern, accessible subscription management application built with [Expo](https://expo.dev) and React Native. Features data persistence, form validation, error handling, and full accessibility support.

## ✨ Features

- ✅ **Subscription Management**: Create and edit subscriptions with app, amount, category, frequency, and reminder settings
- 💾 **Data Persistence**: Automatic save/load using AsyncStorage
- ✅ **Form Validation**: Real-time validation for all form fields
- 🛡️ **Error Handling**: Error boundaries and graceful error recovery
- ♿ **Accessibility**: Full screen reader support with ARIA labels
- 🎨 **Modern UI**: Clean, intuitive interface with bottom sheet modals
- 📱 **Cross-platform**: Works on iOS and Android

## 🏗 Architecture

### State Management

- **React Context API** for global state
- **Custom hooks** for reusable logic (`useModalState`, `useEditSubscription`)
- **AsyncStorage** for data persistence

### Code Organization

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Button, ErrorBoundary)
│   └── modal/          # Modal components
├── screens/            # Screen components with Context
├── hooks/              # Custom React hooks
├── services/           # Business logic (storage, API)
├── utils/              # Helper functions (validation, formatting)
└── constants/          # App constants (colors, spacing, strings)
```

### Key Patterns

- **Separation of Concerns**: UI, logic, and styles are separated
- **Composition**: Small, reusable components
- **Memoization**: Performance optimizations with `useMemo` and `useCallback`
- **Type Safety**: Full TypeScript coverage

## Project Structure

This project follows a clean, organized folder structure:

```
subscriptionAppExpo/
├── app/                    # Expo Router navigation
│   ├── _layout.tsx        # Root layout with providers
│   └── index.tsx          # Main app entry (EditSubscription)
├── src/                    # All application source code
│   ├── assets/            # Images and static assets
│   ├── components/        # Reusable UI components
│   │   └── common/        # Shared components (Button, etc.)
│   ├── constants/         # App constants (colors, spacing, strings)
│   ├── hooks/             # Custom React hooks
│   ├── screens/           # Screen components with context
│   │   └── EditSubscription/
│   │       ├── index.tsx              # Screen UI
│   │       ├── EditSubscriptionContext.tsx  # State management
│   │       └── styles.ts              # Screen styles
│   └── utils/             # Utility functions
└── assets/                # Expo default assets
```

## 🚀 Get Started

### Prerequisites

- Node.js 18+
- Yarn or npm
- Expo CLI (installed automatically)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

2. **Start the development server**

   ```bash
   yarn start
   # or
   npx expo start
   ```

3. **Run on a platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## 📝 Available Scripts

```bash
yarn start          # Start Expo development server
yarn android        # Run on Android
yarn ios            # Run on iOS
yarn web            # Run on web
yarn lint           # Run ESLint
yarn format         # Format code with Prettier
yarn format:check   # Check code formatting
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
API_URL=https://api.example.com
ANALYTICS_KEY=your_key_here
```

### TypeScript

- Strict mode enabled
- Path aliases configured (`@/src/*`)
- Full type coverage

## 🎯 Best Practices Implemented

### Code Quality

- ✅ ESLint + Prettier configuration
- ✅ TypeScript strict mode
- ✅ Consistent code formatting
- ✅ Component memoization for performance

### Error Handling

- ✅ Error boundaries for graceful failures
- ✅ Try-catch blocks for async operations
- ✅ User-friendly error messages
- ✅ Loading states for async actions

### Accessibility

- ✅ Screen reader support
- ✅ Semantic HTML/accessibility roles
- ✅ ARIA labels and hints
- ✅ Keyboard navigation support

### Data Management

- ✅ AsyncStorage for persistence
- ✅ Form validation before save
- ✅ Auto-save functionality
- ✅ Data recovery on app restart

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- UI components inspired by modern design principles
- Icons from Expo Vector Icons
  # or
  yarn start
  ```

  ```

3. **Run on a platform**

   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## Features

- 📊 Subscription management and tracking
- 💰 Amount and category organization
- 📅 Date and frequency selection
- 🔔 Reminder notifications
- 🎨 Clean, intuitive UI
- ⚡ Optimized with React Context
- 📱 Single-screen focused experience

## Development

### Key Technologies

- **Expo Router**: File-based navigation
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe code
- **Bottom Sheet**: Modal interactions via @gorhom/bottom-sheet
- **Reanimated**: Smooth animations

### Import Patterns

```typescript
// From main src index
import { EditSubscriptionScreen, COLORS, useModalState } from '@/src';

// From subdirectories
import { Header, SubscriptionCard } from '@/src/components';
import { COLORS, SPACING } from '@/src/constants';
import { useModalState } from '@/src/hooks';
```

## Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
```

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
