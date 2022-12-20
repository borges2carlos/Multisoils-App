import { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Center, Text, VStack, Button as NativeBaseButton, Icon, KeyboardAvoidingView } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

import Input from '../components/Input';
import Button from '../components/Button';
import Logo from '../components/Logo';
import api from '../config/api';
import useStore from '../stores/useStore';

type FormDataProps = {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().required('E-mail obrigatório!').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatório!'),
})

export default function Login() {
  const navigation = useNavigation();

  const setToken = useStore(state => state.setToken);

  const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => setShowPassword(prevState => !prevState);

  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  })

  const handleLogin = async (data: FormDataProps) => {
    try {
      const res = await api.post('/login', {
        email: data.email,
        password: data.password,
      })

      setToken(res.data.access_token)
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
      navigation.navigate('Tab');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <KeyboardAvoidingView
      h={{
        base: "400px",
        lg: "auto"
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      flex={1}
    >
    <VStack bgColor="light.50" flex={1} px={[9, 64]} justifyContent="center">
      <Center>
        <Logo />
        <Text fontSize="2xl" color="primary.400" fontWeight={500} mt={7}>Dados de acesso</Text>
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

        <VStack>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                title="Senha"
                placeholder="Insira sua senha"
                onChangeText={onChange}
                secureTextEntry={showPassword}
                errorMessage={errors.password?.message}
                InputRightElement={
                  <NativeBaseButton variant="ghost" _pressed={{ bg: 'none' }} size="xs" rounded="none" w="1/6" h="full" onPress={handleClickShowPassword}>
                    <Icon as={Ionicons} name={showPassword ? "eye-off-outline" : "eye-outline"} size="lg" />
                  </NativeBaseButton>
                }
              />
            )}
          />
        </VStack>
      </VStack>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text
          fontWeight={500}
          color="primary.400"
          fontSize="sm"
          alignSelf="flex-end"
        >
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>

      <Button title="Entrar" mt={12} onPress={handleSubmit(handleLogin)} />
    </VStack>
    </KeyboardAvoidingView>
  );
};
