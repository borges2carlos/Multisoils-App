import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StackRoutes from './stack.routes';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Group>
        <Screen name="Stack" component={StackRoutes} />
      </Group>
    </Navigator>
  );
}
