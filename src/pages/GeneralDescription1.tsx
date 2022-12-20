import { useEffect, useState } from 'react';
import { ScrollView, VStack, HStack, Radio, Image, Text, Center } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';
import uuid from 'react-native-uuid';
import * as _ from 'lodash';
import { useNavigation, useRoute } from '@react-navigation/native';

import HeaderSimple from '../components/HeaderSimple';
import Input from '../components/Input';
import InputSelect from '../components/InputSelect';
import InputMask from '../components/InputMask';
import RadioCustom from '../components/RadioCustom';
import Button from '../components/Button';
import formStep1 from '../assets/image/formStep1.png';
import { TCombos } from '../databases/schemas/CombosSchema';
import { useMainContext } from '../contexts/RealmContext';

type FormDataProps = {
  typeObservation: string;
  code: string;
  date: string;
  claTaxo: string;
  uniMape: string;
  artiFolh: string;
  escala: string;
  geoLat: string;
  geoLng: string;
  utmLat: string;
  utmLng: string;
  datum: string;
  fusos: string;
  altitude: string;
  pais: string;
  estado: string;
  munincipio: string;
  situacao: string;
  situacaoTextInput: string;
  situacaoSelectInput: string;
  declividade: string;
  coberturaVegetal: string;
  clima: string;
  climaSelect: string;
  litoClassePrincipal: string;
  litoGrupoPrincipal: string;
  litoTipoRocha: string;
  unidadeLitoestatigrafica: string;
  materialOriginario: string;
  eon: string;
  era: string;
  periodo: string;
  epoca: string;
  milhoesAnos: string;
  rochosidade: string;
  relevoLocal: string;
  relevoRegional: string;
}

const formSchema = yup.object({
  typeObservation: yup.string().required('Obrigatório'),
  code: yup.string().required('Obrigatório'),
  date: yup.string().required('Obrigatório'),
  claTaxo: yup.string().required('Obrigatório'),
  uniMape: yup.string().required('Obrigatório'),
  artiFolh: yup.string().required('Obrigatório'),
  escala: yup.string().required('Obrigatório'),
  geoLat: yup.string().required('Obrigatório'),
  geoLng: yup.string().required('Obrigatório'),
  utmLat: yup.string().required('Obrigatório'),
  utmLng: yup.string().required('Obrigatório'),
  datum: yup.string().required('Obrigatório'),
  fusos: yup.string().required('Obrigatório'),
  altitude: yup.string().required('Obrigatório'),
  pais: yup.string().required('Obrigatório'),
  estado: yup.string().required('Obrigatório'),
  munincipio: yup.string().required('Obrigatório'),

  situacao: yup.string().required('Obrigatório'),
  situacaoTextInput: yup
    .string()
    .when('situacao', {
      is: 'situacaoRadioText',
      then: yup.string().required('Obrigatório Input')
    }),
  situacaoSelectInput: yup
    .string()
    .when('situacao', {
      is: 'situacaoRadioSelect',
      then: yup.string().required('Obrigatório select')
    }),

  declividade: yup.string().required('Obrigatório'),
  coberturaVegetal: yup.string().required('Obrigatório'),

  clima: yup.string().required('Obrigatório'),
  climaSelect: yup
    .string()
    .when('clima', {
      is: (clima) => !!clima,
      then: yup.string().required('Obrigatório')
    }),

  litoClassePrincipal: yup.string().required('Obrigatório'),
  litoGrupoPrincipal: yup.string().required('Obrigatório'),
  litoTipoRocha: yup.string().required('Obrigatório'),
  unidadeLitoestatigrafica: yup.string().required('Obrigatório'),
  materialOriginario: yup.string().required('Obrigatório'),
  eon: yup.string().required('Obrigatório'),
  era: yup.string().required('Obrigatório'),
  periodo: yup.string().required('Obrigatório'),
  epoca: yup.string().required('Obrigatório'),
  milhoesAnos: yup.string().required('Obrigatório'),
  rochosidade: yup.string().required('Obrigatório'),
  relevoLocal: yup.string().required('Obrigatório'),
  relevoRegional: yup.string().required('Obrigatório'),
})

interface RouteParams {
  code: number;
}

export default function GeneralDescription1() {
  const navigation = useNavigation();
  const route = useRoute();
  const [dataCombo, setDataCombo] = useState<TCombos|undefined>(undefined);
  const realm = useMainContext()

  const { code } = route.params as RouteParams;

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormDataProps>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  })

  const situacaoField = watch("situacao", undefined);
  const climaField = watch("clima", undefined);
  const litoClassePrincipalField = watch("litoClassePrincipal", undefined);
  const litoGrupoPrincipalField = watch("litoGrupoPrincipal", undefined);
  const paisField = watch("pais", undefined);
  const estadoField = watch("estado", undefined);
  const eonField = watch("eon", undefined);
  const eraField = watch("era", undefined);
  const periodoField = watch("periodo", undefined);
  const epocaField = watch("epoca", undefined);

  useEffect(() => {
    if (!!eonField && !!eraField && !!periodoField && !!epocaField) {
      setValue('milhoesAnos', dataCombo.chronologies.filter(item => item.eon === eonField && item.age === eraField && item.period === periodoField && item.time === epocaField)[0]?.years);
    }
  }, [eonField, eraField, periodoField, epocaField])

  const subForm = async (data: FormDataProps) => {
    if (!realm) return;

    try {
      realm.write(() => {
        realm.create("GeneralDescForm", {
          _id: uuid.v4(),
          created_at: new Date(),
          updated_at: new Date(),
          statusSync: false,
          ...data,
        })
      })

      console.log('secesso');
      navigation.navigate('GeneralDescription2', { code })
    } catch (e) {
      console.log(e);
    }
  }

  const setInfo = async () => {
    setValue('typeObservation', 'perfil');
    setValue('code', String(code));
    setValue('date', moment().format('L'));
    if (!realm) return;

    try {
      const combosData = realm
        .objects<TCombos[]>('Combos')
        .filtered("_id = 'DataCombos'")
        .toJSON()[0] as TCombos;

      setDataCombo(combosData);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setInfo()
  }, [realm])

  if (!dataCombo) return <></>;

  return (
    <VStack bgColor="light.50" safeArea flex={1}>
      <HeaderSimple title="nome do projeto" />

      <ScrollView bgColor="light.50" flex={1} px={[5, 64]} showsVerticalScrollIndicator={false}>
        <Center mt={4}>
          <Center p={1} borderWidth={1} borderRadius="3xl" borderColor="gray.300">
            <Center py={2} px={3} rounded="3xl" bg="primary.400">
              <Text fontWeight={500} color="light.50">Descrição geral</Text>
            </Center>
          </Center>
        </Center>

        <Image source={formStep1} alt="Alternate Text" resizeMode="contain" h={7} my={4} />

        <Text fontWeight={500} fontSize="lg" mb={3}>Geral</Text>

        <VStack>
          <Controller
            control={control}
            name="typeObservation"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Tipo de observação"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.typeObservation?.message}
                isDisabled
                options={[
                  {
                    label: 'Perfil',
                    value: 'perfil',
                  }
                ]}
              />
            )}
          />
        </VStack>

        <VStack>
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Código"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.code?.message}
                isDisabled
              />
            )}
          />
        </VStack>

        <VStack>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <InputMask
                title="Data"
                onChangeText={onChange}
                errorMessage={errors.date?.message}
                type="datetime"
                value={value}
                options={{
                  format: 'DD/MM/YYYY',
                }}
              />
            )}
          />
        </VStack>

        <VStack>
          <Controller
            control={control}
            name="claTaxo"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Classificação Taxonômica"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.claTaxo?.message}
              />
            )}
          />
        </VStack>

        <VStack>
          <Controller
            control={control}
            name="uniMape"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Unidade de mapeamento"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.uniMape?.message}
              />
            )}
          />
        </VStack>

        <VStack>
          <Controller
            control={control}
            name="artiFolh"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Articulação/Folha"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.artiFolh?.message}
              />
            )}
          />
        </VStack>

        <VStack>
          <Controller
            control={control}
            name="escala"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Escala"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.escala?.message}
                options={dataCombo.scale.map((item) => ({ label: item.value, value: item.index }))}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" mb={3}>Coordenada Geográfica</Text>

        <HStack space={4} w="47.5%">
          <Controller
            control={control}
            name="geoLat"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Latitude"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.geoLat?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="geoLng"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Longitude"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.geoLng?.message}
              />
            )}
          />
        </HStack>

        <Text fontWeight={500} fontSize="lg" mb={3}>Coordenada UTM</Text>

        <HStack space={4} w="47.5%">
          <Controller
            control={control}
            name="utmLat"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Latitude"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.utmLat?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="utmLng"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Longitude"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.utmLng?.message}
              />
            )}
          />
        </HStack>

        <VStack>
          <Controller
            control={control}
            name="datum"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Datum"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.datum?.message}
                options={dataCombo.datum.map((item) => ({ label: item.name, value: String(item.id) }))}
              />
            )}
          />
        </VStack>

        <VStack>
          <Controller
            control={control}
            name="fusos"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Fusos"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.fusos?.message}
                options={dataCombo.spindle.map((item) => ({ label: item.n_hemisphere, value: String(item.id) }))}
              />
            )}
          />
        </VStack>

        <VStack>
          <Controller
            control={control}
            name="altitude"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Altitude"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.altitude?.message}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" mb={3}>Localização</Text>

        <VStack>
          <Controller
            control={control}
            name="pais"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="País"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.pais?.message}
                options={dataCombo.country.map((item) => ({ label: item.country, value: String(item.id) }))}
              />
            )}
          />
        </VStack>

        <VStack>
          <Controller
            control={control}
            name="estado"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Estado"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.estado?.message}
                isDisabled={!paisField}
                options={dataCombo.state.filter(item => item.country_id === Number(paisField)).map((item) => ({ label: item.state, value: String(item.id) }))}
              />
            )}
          />
        </VStack>

        <VStack>
          <Controller
            control={control}
            name="munincipio"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Munincípio"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.munincipio?.message}
                isDisabled={!estadoField}
                options={dataCombo.city.filter(item => item.state_id === Number(estadoField)).map((item) => ({ label: item.city, value: String(item.id) }))}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" mb={3}>Situação</Text>

        <VStack>
          <Controller
            control={control}
            name="situacao"
            render={({ field: { onChange, value } }) => (
              <Radio.Group name="myRadioGroupSituacao" accessibilityLabel="favorite number" value={value} onChange={onChange}>
                <RadioCustom
                  value="situacaoRadioText"
                  text="Escrever situação"
                />

                <RadioCustom
                  value="situacaoRadioSelect"
                  text="Selecionar situação"
                />
              </Radio.Group>
            )}
          />

          <Text color="error.600" fontWeight={400} fontSize="xs">
            {errors.situacao?.message}
          </Text>

          {situacaoField === 'situacaoRadioSelect' && (
            <VStack mt={1}>
              <Controller
                control={control}
                name="situacaoSelectInput"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.situacaoSelectInput?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      },{
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Terço superior de elevação',
                        value: '2',
                      },{
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Terço médio de elevação',
                        value: '3',
                      },{
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Terço inferior de elevação',
                        value: '4',
                      },{
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Baixada',
                        value: '5',
                      },
                    ]}
                  />
                )}
              />
            </VStack>
          )}

          {situacaoField === 'situacaoRadioText' && (
            <VStack mt={1}>
              <Controller
                control={control}
                name="situacaoTextInput"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Escrever situação"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.situacaoTextInput?.message}
                  />
                )}
              />
            </VStack>
          )}
        </VStack>

        <Text fontWeight={500} fontSize="lg" mb={3}>Declividade</Text>

        {/*todo voltar aqui*/}
        <VStack>
          <Controller
            control={control}
            name="declividade"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Declividade em %"
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                errorMessage={errors.declividade?.message}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" mb={3}>Cobertura vegetal sobre o perfil</Text>

        <VStack>
          <Controller
            control={control}
            name="coberturaVegetal"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Informe a cobertura"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.coberturaVegetal?.message}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" mb={3}>Clima (Köppen-Geiger)</Text>

        <VStack borderWidth={1} borderRadius={6} borderColor="gray.300" pt={4} pr={4} pl={4}>
          <Controller
            control={control}
            name="clima"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.clima?.message}
                options={dataCombo.type_climates.map((item) => ({ label: item.value, value: item.index }))}
              />
            )}
          />

          <HStack justifyContent="space-between" borderWidth={1} borderRadius={6} borderColor="gray.300" px={4} py={2} mb={2}>
            <Text fontWeight={400} fontSize="sm" color="gray.500">Índice</Text>
            <Text fontWeight={400} fontSize="sm" color="gray.500">Subcategoria</Text>
            <Text fontWeight={400} fontSize="sm" color="gray.500">Código</Text>
          </HStack>

          <ScrollView h={56} showsVerticalScrollIndicator={false}>
            <Controller
              control={control}
              name="climaSelect"
              render={({ field: { onChange, value } }) => (
                <Radio.Group name="myRadioGroupClimaSelect" accessibilityLabel="favorite number" value={value} onChange={onChange}>
                  {dataCombo.climates.filter(item => item.type === climaField).map(({index, subcategory, code, id}) => (
                    <RadioCustom
                      key={code}
                      value={String(id)}
                      indice={index}
                      subCategory={subcategory}
                      code={code}
                      showBorder
                    />
                  ))}
                </Radio.Group>
              )}
            />
          </ScrollView>

          <Text color="error.600" fontWeight={400} fontSize="xs">
            {errors.climaSelect?.message}
          </Text>
        </VStack>

        <Text fontWeight={500} fontSize="lg" my={3}>Litologia</Text>

        <VStack borderWidth={1} borderRadius={6} borderColor="gray.300" p={4}>
          <Controller
            control={control}
            name="litoClassePrincipal"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Classe Principal"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.litoClassePrincipal?.message}
                options={Object.keys(_.groupBy(dataCombo.litologies, 'class')).map(item => ({label: item, value: item}))}
              />
            )}
          />

          <Controller
            control={control}
            name="litoGrupoPrincipal"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Grupo Principal"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.litoGrupoPrincipal?.message}
                isDisabled={!litoClassePrincipalField}
                options={Object.keys(_.groupBy(dataCombo.litologies.filter(item => item.class === litoClassePrincipalField), 'group')).map(item => ({label: item, value: item}))}
              />
            )}
          />

          <Controller
            control={control}
            name="litoTipoRocha"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Tipo de Rocha"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.litoTipoRocha?.message}
                isDisabled={!litoGrupoPrincipalField}
                options={Object.keys(_.groupBy(dataCombo.litologies.filter(item => item.group === litoGrupoPrincipalField), 'type_rock')).map(item => ({label: item, value: item}))}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" my={3}>Unidade Litoestatigráfica</Text>

        <VStack>
          <Controller
            control={control}
            name="unidadeLitoestatigrafica"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                errorMessage={errors.unidadeLitoestatigrafica?.message}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" mb={3}>Material originário</Text>

        <VStack>
          <Controller
            control={control}
            name="materialOriginario"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                errorMessage={errors.materialOriginario?.message}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" mb={3}>Cronologia</Text>

        <VStack borderWidth={1} borderRadius={6} borderColor="gray.300" p={4}>
          <Controller
            control={control}
            name="eon"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Éon"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.eon?.message}
                options={Object.keys(_.groupBy(dataCombo.chronologies, 'eon')).map(item => ({label: item, value: item}))}
              />
            )}
          />

          <Controller
            control={control}
            name="era"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Era"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.era?.message}
                isDisabled={!eonField}
                options={Object.keys(_.groupBy(dataCombo.chronologies.filter(item => item.eon === eonField), 'age')).map(item => ({label: item, value: item}))}
              />
            )}
          />

          <Controller
            control={control}
            name="periodo"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Periodo"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.periodo?.message}
                isDisabled={!eraField}
                options={Object.keys(_.groupBy(dataCombo.chronologies.filter(item => item.age === eraField), 'period')).map(item => ({label: item, value: item}))}
              />
            )}
          />

          <Controller
            control={control}
            name="epoca"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                title="Época"
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.epoca?.message}
                isDisabled={!periodoField}
                options={Object.keys(_.groupBy(dataCombo.chronologies.filter(item => item.period === periodoField), 'time')).map(item => ({label: item, value: item}))}
              />
            )}
          />

          <Controller
            control={control}
            name="milhoesAnos"
            render={({ field: { onChange, value } }) => (
              <Input
                title="Milhões de anos"
                onChangeText={onChange}
                value={value}
                isDisabled
                errorMessage={errors.milhoesAnos?.message}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" my={3}>Rochosidade</Text>

        <VStack>
          <Controller
            control={control}
            name="rochosidade"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.rochosidade?.message}
                options={[
                  {
                    label: 'Não Rochosa',
                    value: 'naoRochosa',
                  },{
                    label: 'Ligeiramente Rochosa',
                    value: 'ligeiramenteRochosa',
                  },{
                    label: 'Moderadamente Rochosa',
                    value: 'moderadamenteRochosa',
                  },{
                    label: 'Rochosa',
                    value: 'rochosa',
                  },{
                    label: 'Muito Rochosa',
                    value: 'muitoRochosa',
                  },{
                    label: 'Extremamente Rochosa',
                    value: 'extremamenteRochosa',
                  },
                ]}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" mb={3}>Relevo Local</Text>

        <VStack>
          <Controller
            control={control}
            name="relevoLocal"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.relevoLocal?.message}
                options={[
                  {
                    label: 'Plano',
                    value: 'plano',
                  },{
                    label: 'Suave Ondulado',
                    value: 'suaveOndulado',
                  },{
                    label: 'Ondulado',
                    value: 'ondulado',
                  },{
                    label: 'Forte ondulado',
                    value: 'forteOndulado',
                  },{
                    label: 'Montanhoso',
                    value: 'montanhoso',
                  },{
                    label: 'Escarpado',
                    value: 'escarpado',
                  },
                ]}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" mb={3}>Relevo Regional</Text>

        <VStack>
          <Controller
            control={control}
            name="relevoRegional"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.relevoRegional?.message}
                options={[
                  {
                    label: 'Plano',
                    value: 'plano',
                  },{
                    label: 'Plano a Suave Ondulado',
                    value: 'planoSuaveOndulado',
                  },{
                    label: 'Suave Ondulado',
                    value: 'suaveOndulado',
                  },{
                    label: 'Suave ondulado a Ondulado',
                    value: 'suaveOnduladoAOndulado',
                  },{
                    label: 'Ondulado',
                    value: 'ondulado',
                  },{
                    label: 'Ondulado a Forte Ondulado',
                    value: 'onduladoAForteOndulado',
                  },{
                    label: 'Forte ondulado',
                    value: 'forteOndulado',
                  },{
                    label: 'Forte Ondulado a Montanhoso',
                    value: 'forteOnduladoAMontanhoso',
                  },{
                    label: 'Montanhoso',
                    value: 'montanhoso',
                  },{
                    label: 'Montanhoso a Escarpado',
                    value: 'montanhosoAEscarpado',
                  },{
                    label: 'Escarpardo',
                    value: 'escarpardo',
                  },
                ]}
              />
            )}
          />
        </VStack>
      </ScrollView>

      <VStack px={[5, 64]}>
        <Button title="Prosseguir" onPress={handleSubmit(subForm)} />
      </VStack>
    </VStack>
  );
};
