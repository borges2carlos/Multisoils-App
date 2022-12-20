import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import './src/config/ReactotronConfig';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br')

import App from './src';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
