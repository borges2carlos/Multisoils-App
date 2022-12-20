import { Avatar, HStack } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import Logo from './Logo';
import logoSmall from '../assets/image/logo-small.png';

export default function Header() {
  return (
    <LinearGradient
      colors={['#774E00', '#ED9C00']}
      start={[0, 0]}
      end={[1, 1]}
      style={{ borderRadius: 15 }}
    >
      <HStack justifyContent="space-between" alignItems="center" px={8} py={12}>
        <Avatar bg="primary.400" source={logoSmall}/>
        <Logo color="light" size="regular" />
        <Avatar bg="primary.400" source={{
          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        }}/>
      </HStack>
    </LinearGradient>
  );
};
