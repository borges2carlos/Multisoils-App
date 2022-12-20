import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HStack, Image, ScrollView, Text, VStack } from 'native-base';

import Header from '../components/Header';
import iconAvatarSearch from '../assets/image/iconAvatarSearch.png';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import api from '../config/api';
import { TCombos } from '../databases/schemas/CombosSchema';
import { UpdateMode } from 'realm';
import { useMainContext } from '../contexts/RealmContext';

export default function Main() {
  const navigation = useNavigation();
  const realm = useMainContext()

  const getCombos = async () => {
    if (!realm) return;

    try {
      const { data } = await api.get('/combos');

      realm.write(() => {
        realm.create<TCombos>("Combos", {
          _id: "DataCombos",
          observationType: Object.entries(data.ObservationType).map(item => ({index: String(item[0]), value: String(item[1])})),
          scale: Object.entries(data.scale).map(item => ({index: String(item[0]), value: String(item[1])})),
          datum: data.datum,
          spindle: data.spindle,
          country: data.localization.country,
          state: data.localization.state,
          city: data.localization.city,
          type_climates: Object.entries(data.type_climates).map(item => ({index: String(item[0]), value: String(item[1])})),
          climates: data.climates,
          type_litology: Object.entries(data.type_litology).map(item => ({index: String(item[0]), value: String(item[1])})),
          litologies: data.litologies,
          type_chronology: Object.entries(data.type_chronology).map(item => ({index: String(item[0]), value: String(item[1])})),
          chronologies: data.chronologies,
        }, UpdateMode.Modified)
      })
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getCombos();
  }, [realm]);

  return (
    <VStack bgColor="light.50" safeAreaTop flex={1}>
      <Header />

      <VStack bgColor="light.50" flex={1} px={[5, 5]} mt={4}>
        <Text fontWeight={600} color="primary.400" fontSize="2xl">Início</Text>

        <ScrollView mt={3} showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#774E00', '#ED9C00']}
            start={[0, 0]}
            end={[1, 1]}
            style={{ borderRadius: 10, marginBottom: 15 }}
          >
            <HStack justifyContent="space-between" alignItems="center" px={3} py={4}>
              <VStack flex={1.5}>
                <Text fontWeight={500} fontSize="lg" color="light.50">Projetos Públicos</Text>
                <Text fontWeight={400} fontSize="sm" color="light.50">Visualize todos os{'\n'} projetos públicos</Text>
              </VStack>

              <VStack>
                <Image source={iconAvatarSearch} alt="Alternate Text" size="xl" resizeMode="contain" />
              </VStack>
            </HStack>
          </LinearGradient>

          <LinearGradient
            colors={['#774E00', '#ED9C00']}
            start={[0, 0]}
            end={[1, 1]}
            style={{ borderRadius: 10, marginBottom: 15 }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('MyProjects')}>
              <HStack justifyContent="space-between" alignItems="center" px={3} py={4}>
                <VStack flex={1.5}>
                  <Text fontWeight={500} fontSize="lg" color="light.50">Meus Projetos</Text>
                  <Text fontWeight={400} fontSize="sm" color="light.50">Visualize e edite os{'\n'} seus projetos</Text>
                </VStack>

                <VStack>
                  <Image source={iconAvatarSearch} alt="Alternate Text" size="xl" resizeMode="contain" />
                </VStack>
              </HStack>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['#774E00', '#ED9C00']}
            start={[0, 0]}
            end={[1, 1]}
            style={{ borderRadius: 10, marginBottom: 15 }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Help')}>
              <HStack justifyContent="space-between" alignItems="center" px={3} py={4}>
                <VStack flex={1.5}>
                  <Text fontWeight={500} fontSize="lg" color="light.50">Ajuda</Text>
                  <Text fontWeight={400} fontSize="sm" color="light.50">Entenda os primeiros{'\n'} passos</Text>
                </VStack>

                <VStack>
                  <Image source={iconAvatarSearch} alt="Alternate Text" size="xl" resizeMode="contain" />
                </VStack>
              </HStack>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </VStack>
    </VStack>
  );
};
