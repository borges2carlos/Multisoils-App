import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView, VStack, Radio, Image, Text, Center, Divider, HStack, Icon } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Video } from 'expo-av';

import HeaderSimple from '../components/HeaderSimple';
import Input from '../components/Input';
import InputSelect from '../components/InputSelect';
import RadioCustom from '../components/RadioCustom';
import Button from '../components/Button';
import formStep3 from '../assets/image/formStep3.png';
import { TGeneralDescForm } from '../databases/schemas/GeneralDescFormSchema';
import TextArea from '../components/TextArea';
import { TImageForm } from '../databases/schemas/ImageFormSchema';
import { TVideoForm } from '../databases/schemas/VideoFormSchema';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMainContext } from '../contexts/RealmContext';

type FormDataProps = {
  rachadurasSuperficiais: string;
  rachadurasSuperficiaisLargura: string;
  rachadurasSuperficiaisLarguraCriterio: string;
  rachadurasSuperficiaisProfundidade: string;
  rachadurasSuperficiaisProfundidadeCriterio: string;
  rachadurasSuperficiaisDistanciaRachadura: string;
  rachadurasSuperficiaisDistanciaRachaduraCriterio: string;
  presencaSaisSuperficie: string;
  presencaSaisSuperficieCoberturaSuper: string;
  presencaSaisSuperficieCoberturaSuperCriterio: string;
  presencaSaisSuperficieEspessura: string;
  presencaSaisSuperficieEspessuraCriterio: string;
  descritoColetado: string;
  observacoes: string;
}

const formSchema = yup.object({
  rachadurasSuperficiais: yup.string().required('Obrigatório'),
  rachadurasSuperficiaisLargura: yup.string().when('rachadurasSuperficiais', {
    is: (rachadurasSuperficiais) => rachadurasSuperficiais === 'rachadurasSuperficiaisObser',
    then: yup.string().required('Obrigatório')
  }),
  rachadurasSuperficiaisLarguraCriterio: yup.string().when('rachadurasSuperficiais', {
    is: (rachadurasSuperficiais) => rachadurasSuperficiais === 'rachadurasSuperficiaisObser',
    then: yup.string().required('Obrigatório')
  }),
  rachadurasSuperficiaisProfundidade: yup.string().when('rachadurasSuperficiais', {
    is: (rachadurasSuperficiais) => rachadurasSuperficiais === 'rachadurasSuperficiaisObser',
    then: yup.string().required('Obrigatório')
  }),
  rachadurasSuperficiaisProfundidadeCriterio: yup.string().when('rachadurasSuperficiais', {
    is: (rachadurasSuperficiais) => rachadurasSuperficiais === 'rachadurasSuperficiaisObser',
    then: yup.string().required('Obrigatório')
  }),
  rachadurasSuperficiaisDistanciaRachadura: yup.string().when('rachadurasSuperficiais', {
    is: (rachadurasSuperficiais) => rachadurasSuperficiais === 'rachadurasSuperficiaisObser',
    then: yup.string().required('Obrigatório')
  }),
  rachadurasSuperficiaisDistanciaRachaduraCriterio: yup.string().when('rachadurasSuperficiais', {
    is: (rachadurasSuperficiais) => rachadurasSuperficiais === 'rachadurasSuperficiaisObser',
    then: yup.string().required('Obrigatório')
  }),
  presencaSaisSuperficie: yup.string().required('Obrigatório'),
  presencaSaisSuperficieCoberturaSuper: yup.string().when('presencaSaisSuperficie', {
    is: (presencaSaisSuperficie) => presencaSaisSuperficie === 'presencaSaisSuperficieObser',
    then: yup.string().required('Obrigatório')
  }),
  presencaSaisSuperficieCoberturaSuperCriterio: yup.string().when('presencaSaisSuperficie', {
    is: (presencaSaisSuperficie) => presencaSaisSuperficie === 'presencaSaisSuperficieObser',
    then: yup.string().required('Obrigatório')
  }),
  presencaSaisSuperficieEspessura: yup.string().when('presencaSaisSuperficie', {
    is: (presencaSaisSuperficie) => presencaSaisSuperficie === 'presencaSaisSuperficieObser',
    then: yup.string().required('Obrigatório')
  }),
  presencaSaisSuperficieEspessuraCriterio: yup.string().when('presencaSaisSuperficie', {
    is: (presencaSaisSuperficie) => presencaSaisSuperficie === 'presencaSaisSuperficieObser',
    then: yup.string().required('Obrigatório')
  }),
  descritoColetado: yup.string().required('Obrigatório'),
  observacoes: yup.string().required('Obrigatório'),
})

interface RouteParams {
  code: number;
}

export default function GeneralDescription3() {
  const navigation = useNavigation();
  const [image, setImage] = useState<TImageForm[]>([]);
  const [video, setVideo] = useState<TVideoForm[]>([]);
  const realm = useMainContext()
  const route = useRoute();

  const { code } = route.params as RouteParams;

  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormDataProps>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  })

  const rachadurasSuperficiaisField = watch("rachadurasSuperficiais", undefined);
  const presencaSaisSuperficieField = watch("presencaSaisSuperficie", undefined);

  const subForm = async (data: FormDataProps) => {
    if (!realm) return;

    try {
      const projectData = realm
        .objects<TGeneralDescForm>('GeneralDescForm')
        .filtered(`code = '${code}'`)[0];

      realm.write(() => {
        Object.entries(data).map((val) => {
          projectData[val[0]] = val[1]
        })
        projectData.updated_at = new Date();
        projectData.statusSync = false;

        projectData.images = image;
        projectData.videos = video;
      })

      console.log('sucesso!');
      navigation.navigate('MyProjects');
    } catch (e) {
      console.log(e);
    }
  }

  const getFileInfo = async (fileURI: string) => {
    return FileSystem.getInfoAsync(fileURI)
  }

  const isLessThanTheMB = (fileSize: number, smallerThanSizeMB: number) => {
    return fileSize / 1024 / 1024 < smallerThanSizeMB;
  }

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const fileInfo = await getFileInfo(result.assets[0].uri);

        if (!fileInfo?.size) {
          alert("Can't select this file as the size is unknown.")
          return;
        }

        const isLt10MB = isLessThanTheMB(fileInfo.size, 10)
        if (!isLt10MB) {
          alert(`Image size must be smaller than 10MB!`)
          return;
        }

        setImage(prevState => [
          ...prevState,
          {
            assetId: result.assets[0].assetId,
            uri: result.assets[0].uri,
            type: result.assets[0].type,
            fileName: result.assets[0].fileName
          }
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
      });

      if (!result.canceled) {
        const fileInfo = await getFileInfo(result.assets[0].uri);

        if (!fileInfo?.size) {
          alert("Can't select this file as the size is unknown.")
          return;
        }

        const isLt10MB = isLessThanTheMB(fileInfo.size, 10)
        if (!isLt10MB) {
          alert(`Video size must be smaller than 10MB!`)
          return;
        }

        setVideo(prevState => [
          ...prevState,
          {
            assetId: result.assets[0].assetId,
            uri: result.assets[0].uri,
            type: result.assets[0].type,
            fileName: result.assets[0].fileName
          }
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeImage = (assetId) => {
    setImage(prevState => prevState.filter((item) => item.assetId !== assetId));
  };

  const removeVideo = (assetId) => {
    setVideo(prevState => prevState.filter((item) => item.assetId !== assetId));
  };

  return (
    <VStack bgColor="light.50" safeArea flex={1}>
      <HeaderSimple title="nome do projeto 3" />

      <ScrollView bgColor="light.50" flex={1} px={[5, 64]} showsVerticalScrollIndicator={false}>
        <Center mt={4}>
          <Center p={1} borderWidth={1} borderRadius="3xl" borderColor="gray.300">
            <Center py={2} px={3} rounded="3xl" bg="primary.400">
              <Text fontWeight={500} color="light.50">Descrição geral</Text>
            </Center>
          </Center>
        </Center>

        <Image source={formStep3} alt="Alternate Text" resizeMode="contain" h={7} my={4} />

        <Text fontWeight={500} fontSize="lg" mb={3}>Rachaduras superficiais</Text>

        <VStack borderWidth={1} borderRadius={6} borderColor="gray.300" pt={4} pr={4} pl={4}>
          <Controller
            control={control}
            name="rachadurasSuperficiais"
            render={({ field: { onChange, value } }) => (
              <Radio.Group name="myRadioGroupRachadurasSuperficiais" accessibilityLabel="favorite number" value={value} onChange={onChange}>
                <RadioCustom
                  value="rachadurasSuperficiaisNaoObser"
                  text="Não Observado"
                  showBorder
                />

                <RadioCustom
                  value="rachadurasSuperficiaisObser"
                  text="Observado"
                  showBorder
                />
              </Radio.Group>
            )}
          />

          <Text color="error.600" fontWeight={400} fontSize="xs">
            {errors.rachadurasSuperficiais?.message}
          </Text>

          <Divider mb="3" _light={{
            bg: "gray.300"
          }}/>

          {rachadurasSuperficiaisField === 'rachadurasSuperficiaisObser' && (
            <VStack mt={1}>
              <Controller
                control={control}
                name="rachadurasSuperficiaisLargura"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="3.1 Largura"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.rachadurasSuperficiaisLargura?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      }
                    ]}
                  />
                )}
              />

              <Controller
                control={control}
                name="rachadurasSuperficiaisLarguraCriterio"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Critério"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.rachadurasSuperficiaisLarguraCriterio?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      }
                    ]}
                  />
                )}
              />

              <Controller
                control={control}
                name="rachadurasSuperficiaisProfundidade"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="3.2 Profundidade"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.rachadurasSuperficiaisProfundidade?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      }
                    ]}
                  />
                )}
              />

              <Controller
                control={control}
                name="rachadurasSuperficiaisProfundidadeCriterio"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Critério"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.rachadurasSuperficiaisProfundidadeCriterio?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      }
                    ]}
                  />
                )}
              />

              <Controller
                control={control}
                name="rachadurasSuperficiaisDistanciaRachadura"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="3.3 Distância entre rachaduras"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.rachadurasSuperficiaisDistanciaRachadura?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      }
                    ]}
                  />
                )}
              />

              <Controller
                control={control}
                name="rachadurasSuperficiaisDistanciaRachaduraCriterio"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Critério"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.rachadurasSuperficiaisDistanciaRachaduraCriterio?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      }
                    ]}
                  />
                )}
              />
            </VStack>
          )}

          <Text fontWeight={500} fontSize="lg" mb={3}>Presença de sais na superfície</Text>

          <Controller
            control={control}
            name="presencaSaisSuperficie"
            render={({ field: { onChange, value } }) => (
              <Radio.Group name="myRadioGroupPresencaSaisSuperficie" accessibilityLabel="favorite number" value={value} onChange={onChange}>
                <RadioCustom
                  value="presencaSaisSuperficieNaoObser"
                  text="Não Observado"
                  showBorder
                />

                <RadioCustom
                  value="presencaSaisSuperficieObser"
                  text="Observado"
                  showBorder
                />
              </Radio.Group>
            )}
          />

          <Text color="error.600" fontWeight={400} fontSize="xs">
            {errors.presencaSaisSuperficie?.message}
          </Text>

          <Divider mb="3" _light={{
            bg: "gray.300"
          }}/>

          {presencaSaisSuperficieField === 'presencaSaisSuperficieObser' && (
            <VStack mt={1}>
              <Controller
                control={control}
                name="presencaSaisSuperficieCoberturaSuper"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="3.1 Cobertura superficial"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.presencaSaisSuperficieCoberturaSuper?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      }
                    ]}
                  />
                )}
              />

              <Controller
                control={control}
                name="presencaSaisSuperficieCoberturaSuperCriterio"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Critério"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.presencaSaisSuperficieCoberturaSuperCriterio?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      }
                    ]}
                  />
                )}
              />

              <Controller
                control={control}
                name="presencaSaisSuperficieEspessura"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="3.2 Espessura"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.presencaSaisSuperficieEspessura?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      }
                    ]}
                  />
                )}
              />

              <Controller
                control={control}
                name="presencaSaisSuperficieEspessuraCriterio"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Critério"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.presencaSaisSuperficieEspessuraCriterio?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      }
                    ]}
                  />
                )}
              />
            </VStack>
          )}
        </VStack>

        <VStack>
          <Text fontWeight={500} fontSize="lg" my={3}>Descrito e coletado pro</Text>

          <Controller
            control={control}
            name="descritoColetado"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                errorMessage={errors.descritoColetado?.message}
              />
            )}
          />
        </VStack>

        <VStack>
          <Text fontWeight={500} fontSize="lg" mb={3}>Observações</Text>

          <Controller
            control={control}
            name="observacoes"
            render={({ field: { onChange, value } }) => (
              <TextArea
                onChangeText={onChange}
                value={value}
                errorMessage={errors.observacoes?.message}
              />
            )}
          />
        </VStack>

        <VStack>
          <Text fontWeight={500} fontSize="lg" mb={3}>Mídias</Text>

          <TouchableOpacity onPress={pickImage}>
            <HStack justifyContent="space-between" borderWidth={1} borderRadius={15} borderColor="gray.300" borderStyle="dashed" py={4} px={10}>
              <Center>
                <Icon as={Feather} name="upload-cloud" size="4xl" color="primary.400" />
              </Center>

                <VStack>
                  <Text fontWeight={500} fontSize="sm" mb={3}>Selecione uma imagem</Text>
                  <Text fontWeight={400} fontSize="sm">Limite de tamanho 200mb</Text>
                </VStack>
            </HStack>
          </TouchableOpacity>

          {image.map((item) => (
            <Center key={item.assetId} my={4} borderWidth={2} borderRadius={2} borderColor="primary.600">
              <TouchableOpacity
                onPress={() => removeImage(item.assetId)}
                style={{zIndex: 99999, position: 'absolute', right: -8, top: -8, backgroundColor: '#fff', padding: 5, borderRadius: 15}}
              >
                <Icon
                  as={AntDesign}
                  name="closecircleo"
                  color="primary.400"
                  size="sm"
                />
              </TouchableOpacity>

              <Image
                source={{ uri: item.uri }}
                w={400}
                h={300}
                alt={item.fileName}
              />
            </Center>
          ))}
        </VStack>

        <VStack>
          <TouchableOpacity onPress={pickVideo}>
            <HStack justifyContent="space-between" borderWidth={1} borderRadius={15} borderColor="gray.300" borderStyle="dashed" py={4} px={10}>
              <Center>
                <Icon as={Feather} name="upload-cloud" size="4xl" color="primary.400" />
              </Center>

              <VStack>
                <Text fontWeight={500} fontSize="sm" mb={3}>Selecione uma arquivo</Text>
                <Text fontWeight={400} fontSize="sm">Limite de tamanho 400mb</Text>
              </VStack>
            </HStack>
          </TouchableOpacity>

          {video.map((item) => (
            <Center key={item.assetId} my={4} borderWidth={2} borderRadius={2} borderColor="primary.600">
              <TouchableOpacity
                onPress={() => removeVideo(item.assetId)}
                style={{zIndex: 99999, position: 'absolute', right: -8, top: -8, backgroundColor: '#fff', padding: 5, borderRadius: 15}}
              >
                <Icon
                  as={AntDesign}
                  name="closecircleo"
                  color="primary.400"
                  size="sm"
                />
              </TouchableOpacity>

              <Video
                style={{width: 350, height: 300}}
                source={{
                  uri: item.uri,
                }}
                useNativeControls
                isLooping={false}
              />
            </Center>
          ))}
        </VStack>
      </ScrollView>

      <VStack px={[5, 64]}>
        <Button
          title="Concluir"
          onPress={handleSubmit(subForm)}
        />
      </VStack>
    </VStack>
  );
};
