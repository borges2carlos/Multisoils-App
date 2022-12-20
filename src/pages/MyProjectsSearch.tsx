import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, VStack, HStack, Icon, Divider, Image, Center, Input } from 'native-base';
import Feather from '@expo/vector-icons/Feather';
import Accordion from 'react-native-collapsible/Accordion';
import MapView, { Marker, MapPressEvent, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';

import Button from '../components/Button';
import { TouchableOpacity } from 'react-native';
import ButtonBack from '../components/ButtonBack';
import pinMylocale from '../assets/image/pin-mylocale.png';
import pinAdd from '../assets/image/pin-add.png';
import { TMyProject } from '../databases/schemas/MyProjectSchema';
import { useMainContext } from '../contexts/RealmContext';
import Realm from 'realm';

export default function MyProjectsSearch() {
  const navigation = useNavigation();
  const realm = useMainContext()

  const [search, setSearch] = useState<string>('');
  const [activeSections, setActiveSections] = useState<number[] | undefined>([]);
  const [addMarker, setAddMarker] = useState<LatLng>();
  const [location, setLocation] = useState<LatLng>();
  const [myProject, setMyProject] = useState<Realm.Collection<TMyProject & Realm.Object> | TMyProject[]>([]);

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

  const filteredProjects = search.length > 0 ? myProject?.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) : [];

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
      <VStack bgColor="light.50" flex={1} px={[5, 5]} mt={4}>

        <HStack justifyContent="space-between" alignItems="center">
          <ButtonBack />

          <Input
            variant="rounded"
            fontSize="sm"
            fontFamily="body"
            fontWeight={500}
            ml={2}
            _focus={{
              bg: "light.50",
              borderColor: "gray.500"
            }}
            h={10}
            flex={1}
            InputLeftElement={<Icon as={<Feather name="search" />} size={5} ml="2" color="primary.400" />}
            value={search}
            onChangeText={setSearch}
          />
        </HStack>

        <Accordion
          sections={!!search.length ? filteredProjects : myProject}
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
