import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  NavigationContainer,
} from '@react-navigation/native';

import AppRoutes from './app.routes';

export default function Routes() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
