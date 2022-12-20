import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabRoutes from './tab.routes';
import LoginScreen from '../pages/Login';
import ForgotPasswordScreen from '../pages/ForgotPassword';
import ForgotPasswordSendScreen from '../pages/ForgotPasswordSend';
import ForgotPasswordCreateScreen from '../pages/ForgotPasswordCreate';
import StartScreen from '../pages/Start';
import AboutScreen from '../pages/About';
import MyProjectsScreen from '../pages/MyProjects';
import MyProjectsSearchScreen from '../pages/MyProjectsSearch';
import HelpScreen from '../pages/Help';
import GeneralDescription1Screen from '../pages/GeneralDescription1';
import GeneralDescription2Screen from '../pages/GeneralDescription2';
import GeneralDescription3Screen from '../pages/GeneralDescription3';
import SendProjectScreen from '../pages/SendProject';
import useStore from '../stores/useStore';

const { Navigator, Screen } = createNativeStackNavigator();

export default function StackRoutes() {
  const token = useStore(state => state.token);

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={!token ? 'Start' : 'Tab'}
    >
      <Screen name="Tab" component={TabRoutes} />
      <Screen name="Login" component={LoginScreen} />
      <Screen name="About" component={AboutScreen} />
      <Screen name="Start" component={StartScreen} />
      <Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Screen name="ForgotPasswordSend" component={ForgotPasswordSendScreen} />
      <Screen name="ForgotPasswordCreate" component={ForgotPasswordCreateScreen} />
      <Screen name="MyProjects" component={MyProjectsScreen} />
      <Screen name="MyProjectsSearch" component={MyProjectsSearchScreen} />
      <Screen name="Help" component={HelpScreen} />
      <Screen name="GeneralDescription1" component={GeneralDescription1Screen} />
      <Screen name="GeneralDescription2" component={GeneralDescription2Screen} />
      <Screen name="GeneralDescription3" component={GeneralDescription3Screen} />
      <Screen name="SendProject" component={SendProjectScreen} />
    </Navigator>
  );
}
