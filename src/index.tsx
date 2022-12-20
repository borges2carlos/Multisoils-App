import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import { useFonts } from 'expo-font';
import {useMediaLibraryPermissions} from 'expo-image-picker';
import * as Location from 'expo-location';

import theme from './theme';

import Routes from './routes';
import { useEffect } from 'react';
import RealmContextProvider from './contexts/RealmContext';

export default function App() {
  const [status, requestPermission] = useMediaLibraryPermissions({ writeOnly: true });

  const [loaded] = useFonts({
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    (async () => {
      await requestPermission()
      await Location.requestForegroundPermissionsAsync();
    })()
  }, [])

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={theme}>
        <RealmContextProvider>
          <Routes />
        </RealmContextProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
