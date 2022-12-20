import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Icon } from 'native-base';
import Feather from '@expo/vector-icons/Feather';

import MainScreen from '../pages/Main';
import MyProjectsScreen from '../pages/MyProjects';

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = 'home';
          } else if (route.name === 'MyProjectsTab') {
            iconName = 'list';
          }

          return <Icon as={Feather} name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'primary.400',
        tabBarInactiveTintColor: 'dark.50',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 100 : 53,
        },
      })}
    >
      <Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return <Text color={focused?'primary.400':'dark.50'} fontSize="sm">Tela de início</Text>;
          },
        }}
      />
      <Screen
        name="MyProjectsTab"
        component={MyProjectsScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return <Text color={focused?'primary.400':'dark.50'} fontSize="sm">Meus projetos</Text>;
          },
        }}
      />
    </Navigator>
  );
}
