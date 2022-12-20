import { useNavigation } from '@react-navigation/native';
import { Center, Text, VStack, ScrollView } from 'native-base';

import Logo from '../components/Logo';
import ButtonBack from '../components/ButtonBack';

export default function Help() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <VStack bgColor="light.50" flex={1} px={[5, 5]} justifyContent="center" safeArea>
      <ButtonBack />
      <Center>
        <Logo />
        <Text fontSize="2xl" color="primary.400" fontWeight={500}>Ajuda</Text>
      </Center>

        <ScrollView showsVerticalScrollIndicator={false} my={3}>
          <Text fontSize="sm" color="dark.50" fontWeight={400} textAlign="center">
            Entenda os seus primeiros passos{'\n'}{'\n'}

            Lorem ipsum dolor sit amet. Et quae voluptas aut nobis natus aut quasi voluptates. Aut sapiente sunt quo eaque minus qui neque magnam. Sed sequi totam aut dolor quia et corrupti quae sed omnis vitae At beatae praesentium sed praesentium aperiam et eaque optio.
            Qui totam exercitationem qui blanditiis similique sed quisquam expedita. Et culpa repellat nam corrupti assumenda et rerum voluptatum ut aliquid quis vel optio autem. In aliquid quod ut soluta eveniet et provident beatae et laborum suscipit eos quae aliquid quo minima voluptatem.
            Est aliquid necessitatibus At nesciunt ipsam et labore officia aut voluptatem natus. In vitae vitae est porro quaerat qui impedit tenetur non itaque repellat vel mollitia voluptas. Non sequi
          </Text>
        </ScrollView>
    </VStack>
  );
};
