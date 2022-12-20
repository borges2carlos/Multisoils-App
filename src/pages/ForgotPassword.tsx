import { Center, Text, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import Input from '../components/Input';
import { TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Logo from '../components/Logo';
import { useNavigation } from '@react-navigation/native';

type FormDataProps = {
  email: string;
}

const loginSchema = yup.object({
  email: yup.string().required('E-mail obrigatório!').email('E-mail inválido'),
})

export default function ForgotPassword() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  })

  const handleSendEmail = (data: FormDataProps) => {
    navigation.navigate('ForgotPasswordSend');
  }

  return (
    <VStack bgColor="light.50" flex={1} px={[9, 64]} justifyContent="center">
      <Center>
        <Logo />
        <Text fontSize="2xl" color="primary.400" fontWeight={500} mt={7}>Esqueceu a senha?</Text>
        <Text fontSize="sm" color="dark.50" fontWeight={400} mt={2}>
          Não se preocupe! Digite seu e-mail para receber instruções de recuperação de senha
        </Text>
      </Center>

      <VStack mt={8} mb={4}>
        <VStack>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                title="E-mail"
                placeholder="Insira seu e-mail"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
          />
        </VStack>
      </VStack>

      <Button title="Recuperar senha" mt={12} onPress={handleSubmit(handleSendEmail)} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          fontWeight={500}
          color="primary.400"
          fontSize="sm"
          alignSelf="center"
          mt={5}
        >
          Lembrou da senha?
        </Text>
      </TouchableOpacity>
    </VStack>
  );
};
