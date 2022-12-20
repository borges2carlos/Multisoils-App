import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Center, Image, Text, VStack } from 'native-base';

import Button from '../components/Button';
import Logo from '../components/Logo';
import logoFull from '../assets/image/logo-full.png';

export default function Start() {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate('Login')
  }

  return (
    <VStack bgColor="light.50" flex={1} px={[9, 64]} justifyContent="center" safeArea>
      <Center>
        <Logo />
        <Text fontSize="2xl" color="primary.400" fontWeight={500} mt={7}>BEM VINDO!</Text>
      </Center>

      <Center flex={1} mt={8} mb={4}>
        <Image source={logoFull} alt="Logo" size="2xl" />
      </Center>

      <VStack flex={1}>
        <Button title="Acessar" mt={12} onPress={handleStart} />
      </VStack>

      <VStack mt={8}>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text
            fontWeight={500}
            color="primary.400"
            fontSize="sm"
            alignSelf="center"
          >
            Quem Somos Nós?
          </Text>
        </TouchableOpacity>
      </VStack>
    </VStack>
  );
};
