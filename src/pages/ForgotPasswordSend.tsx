import { Center, Text, VStack, Image } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import Input from '../components/Input';
import { TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Logo from '../components/Logo';
import { useNavigation } from '@react-navigation/native';
import emailLogo from '../assets/image/email-logo.png';


export default function ForgotPasswordSend() {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('ForgotPasswordCreate');
  }

  return (
    <VStack bgColor="light.50" flex={1} px={[9, 64]} justifyContent="center">
      <Center>
        <Logo />
        <Text fontSize="2xl" color="primary.400" fontWeight={500} mt={7}>E-mail enviado!</Text>
        <Text fontSize="sm" color="dark.50" fontWeight={400} mt={2}>
          Um link de recuperação de senha foi enviado para o e-mail{' '}
          <Text fontSize="sm" color="dark.50" fontWeight={500} mt={2}>marcosceddia@gmail.com</Text>
        </Text>
      </Center>

      <Center mt={8} mb={4}>
        <Image source={emailLogo} alt="Alternate Text" size="2xl" />
      </Center>

      <Button title="Entendi" mt={12} onPress={handleNext} />
      <Button title="Reenviar e-mail" mt={5} variant="outline" />
    </VStack>
  );
};
