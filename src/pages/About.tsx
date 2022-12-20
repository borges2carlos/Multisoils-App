import { useNavigation } from '@react-navigation/native';
import { Center, Text, VStack, ScrollView } from 'native-base';

import Button from '../components/Button';
import Logo from '../components/Logo';

export default function About() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <VStack bgColor="light.50" flex={1} px={[9, 64]} justifyContent="center" safeArea>
      <Center>
        <Logo />
        <Text fontSize="2xl" color="primary.400" fontWeight={500}>Quem Somos Nós?</Text>
      </Center>

      {/*<VStack mt={8} mb={4}>*/}
        <ScrollView showsVerticalScrollIndicator={false} my={3}>
          <Text fontSize="sm" color="dark.50" fontWeight={400}>
            Seja bem vindo à Plataforma MultiSoils. A plataforma MultiSoils é uma solução tecnológica desenvolvida pelo Departamento de AgroTecnologias e Sustentabilidade - DATS (Instituto de Agronomia/UFRRJ.) em parceria com o Cefet-RJ.
            A plataforma representa um espaço digital que tem como objetivo principal tornar as múltiplas informações das diferentes funções do solo facilmente disponíveis para a sociedade. Ao acessar a plataforma os usuários podem ter acesso as seguintes funcionalidades:{'\n'}
            1- Consulta interativa (via APP e WEB) à um base de dados legados de solos provenientes de diferentes levantamentos de solos;{'\n'}
            2- Criar e gerenciar projetos de levantamentos e mapeamento de solos;{'\n'}
            3- Criar e gerenciar projetos de agricultura de precisão;{'\n'}
            4- Criar e gerenciar projetos de inventário de dados diversos de solos (metais pesados, radionucleotideos, estoque de carbono e atributos fisico-hídricos);{'\n'}
            5- Criar e gerenciar projetos de monitoramento de umidade e temperatura do solo;{'\n'}
            6- Criar e gerenciar projetos de educação em Ciência do solo;{'\n'}
            A plataforma foi desenvolvida em linguagem PHP, JS com banco de dados em PostgreSQL, sendo disponibilizada na plataforma Android e IOS.{'\n'}
            O projeto foi concebido e desenvolvido pelo Professor Marcos Bacis Ceddia (DATS-IA-UFRRJ) em parceria com os professores do Cefet-Maracanã Diego Brandão, Jorge Soares e Renato Mauro
          </Text>
        </ScrollView>

      {/*</VStack>*/}

      <Button title="Voltar" onPress={handleBack} />
    </VStack>
  );
};
