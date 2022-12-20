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
  password: string;
  password_confirm: string;
}

const loginSchema = yup.object({
  password: yup.string().required('Senha obrigatório!'),
  password_confirm: yup
    .string()
    .required('Senha obrigatório!')
    .oneOf([yup.ref('password'), null], 'Confirmação de nova senha inválida')
})

export default function ForgotPasswordCreate() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  })

  const handleLogin = (data: FormDataProps) => {
    console.log(data);
  }

  return (
    <VStack bgColor="light.50" flex={1} px={[9, 64]} justifyContent="center">
      <Center>
        <Logo />
        <Text fontSize="2xl" color="primary.400" fontWeight={500} mt={7}>Crie uma nova senha</Text>
        <Text fontSize="sm" color="dark.50" fontWeight={400} mt={2} textAlign="center">
          Preencha os campos abaixo com a nova senha que deseja cadastrar
        </Text>
      </Center>

      <VStack mt={8} mb={4}>
        <VStack>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                title="Nova senha"
                placeholder="Insira a nova senha"
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            )}
          />
        </VStack>

        <VStack>
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange } }) => (
              <Input
                title="Confirmação de nova senha"
                placeholder="Insira a confirmação da sua nova senha"
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />
        </VStack>
      </VStack>

      <Button title="Criar senha" mt={12} onPress={handleSubmit(handleLogin)} />

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
