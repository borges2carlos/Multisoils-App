import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, VStack, HStack, Icon, Divider, Image, Center } from 'native-base';
import Feather from '@expo/vector-icons/Feather';
import Accordion from 'react-native-collapsible/Accordion';
import MapView, { Marker, MapPressEvent, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';

import Header from '../components/Header';
import Button from '../components/Button';
import { TouchableOpacity } from 'react-native';
import ButtonBack from '../components/ButtonBack';
import pinMylocale from '../assets/image/pin-mylocale.png';
import pinAdd from '../assets/image/pin-add.png';
import api from '../config/api';
import { TMyProject } from '../databases/schemas/MyProjectSchema';
import { useMainContext } from '../contexts/RealmContext';
import Realm, { UpdateMode } from 'realm';

export default function MyProjects() {
  const navigation = useNavigation();
  const realm = useMainContext()

  const [activeSections, setActiveSections] = useState<number[] | undefined>([]);
  const [addMarker, setAddMarker] = useState<LatLng>();
  const [location, setLocation] = useState<LatLng>();
  const [myProject, setMyProject] = useState<Realm.Collection<TMyProject & Realm.Object> | TMyProject[]>([]);

  const getMyProjects = async () => {
    if (!realm) return;

    try {
      const { data } = await api.get<TMyProject[]>('/project/private');

      realm.write(() => {
        data.map((item: TMyProject) => {
          realm.create<TMyProject[]>("MyProject", {
            ...item,
          }, UpdateMode.Modified)
        })
      })
    } catch (e) {
      console.log(e);
    }
  }

  const _onMapPress = (event: MapPressEvent) => {
    setAddMarker(event.nativeEvent.coordinate);
  }

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Balanced,
      });

      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    getMyProjects()
  }, [realm])

  useEffect(() => {
    const cleanup = (async () => {
      const project = realm.objects<TMyProject>("MyProject");

      setMyProject(project);

      project.addListener((val) => {
        setMyProject(val);
      })

      return () => {
        project.removeAllListeners();
      }
    })()

    return () => {
      cleanup.then((func) => func());
    }
  }, [])

  const _renderHeader = (content: TMyProject, index, isActive, sections) => {
    return (
      <VStack>
        <HStack alignItems="center" justifyContent="space-between">
          <Text>{content.name}</Text>
          <Icon as={Feather} name={isActive ? "arrow-up-circle" : "arrow-down-circle"} size="lg" color="primary.400" />
        </HStack>
        <Divider my="3" _light={{
          bg: "gray.300"
        }}/>
      </VStack>
    );
  };

  const _renderContent = (content: TMyProject, index, isActive, sections) => {
    return (
      <VStack>
        <Text fontWeight={400} fontSize="xs">OBS: Para adicionar um ponto novo basta tocar no ponto desejado no mapa</Text>
        {isActive && !!location && (
          <VStack w="100%" h="300">
            <MapView
              style={{
                width: '100%',
                height: '100%',
              }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={_onMapPress}
              toolbarEnabled={false}
            >
              {!!addMarker && (
                <Marker
                  coordinate={{
                    latitude: addMarker.latitude,
                    longitude: addMarker.longitude,
                  }}
                >
                  <Center>
                    <Image source={pinAdd} w={6} h={6} alt="pinAdd" resizeMode="contain" />
                    <TouchableOpacity onPress={() => console.log('dasdasd')}>
                      <VStack bg="primary.400" py={1} px={3} rounded={50} mt={1}>
                        <Text color="light.50">+ Adicionar</Text>
                      </VStack>
                    </TouchableOpacity>
                  </Center>
                </Marker>
              )}
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              >
                <Center>
                  <Image source={pinMylocale} w={6} h={6} alt="pinMylocale" resizeMode="contain" />
                  <Text mt={1}>Você está aqui</Text>
                </Center>
              </Marker>
            </MapView>
          </VStack>
        )}

        <HStack alignItems="center" mt={2}>
          <Text flex={1}>DESCRIÇÃO GERAL</Text>

          <Button
            mr={2}
            title={<Icon as={Feather} name="plus" color="light.50" />}
            size="xs"
            onPress={() => navigation.navigate('GeneralDescription1', {code: content.id})}
          />
          <Button title="Salvar" size="xs" onPress={() => navigation.navigate('SendProject', {code: content.id})} />
        </HStack>

        <HStack alignItems="center" mt={2}>
          <Text flex={1}>DESCRIÇÃO MORFOLÓGICA</Text>

          <Button mr={2} title={<Icon as={Feather} name="plus" color="light.50" />} size="xs" />
          <Button title="Salvar" size="xs" />
        </HStack>
      </VStack>
    );
  };

  return (
    <VStack bgColor="light.50" safeAreaTop flex={1}>
      <Header />

      <VStack bgColor="light.50" flex={1} px={[5, 5]} mt={4}>
        <ButtonBack />

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight={600} color="primary.400" fontSize="2xl">Meus Projetos</Text>

          <TouchableOpacity
            style={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, padding: 8}}
            onPress={() => navigation.navigate('MyProjectsSearch')}
          >
            <Icon as={Feather} name="search" color="primary.400" size="md" />
          </TouchableOpacity>
        </HStack>

        <Accordion
          sections={myProject}
          activeSections={activeSections}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={(index) => setActiveSections(index)}
          renderAsFlatList
          showsVerticalScrollIndicator={false}
          containerStyle={{
            marginTop: 10
          }}
          underlayColor="transparent"
          sectionContainerStyle={{
            borderColor: '#d7d7d7',
            borderWidth: 1,
            borderRadius: 5,
            padding: 15,
            marginBottom: 16
          }}
        />
      </VStack>
    </VStack>
  );
};
