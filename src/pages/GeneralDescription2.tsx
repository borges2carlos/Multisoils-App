import { ScrollView, VStack, Radio, Image, Text, Center, Divider } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import HeaderSimple from '../components/HeaderSimple';
import Input from '../components/Input';
import InputSelect from '../components/InputSelect';
import RadioCustom from '../components/RadioCustom';
import Button from '../components/Button';
import formStep2 from '../assets/image/formStep2.png';
import { TGeneralDescForm } from '../databases/schemas/GeneralDescFormSchema';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMainContext } from '../contexts/RealmContext';

type FormDataProps = {
  erosao: string;
  erosaoEolicaForma: string;
  erosaoEolicaGrau: string;
  erosaoHidricaLaminar: string;
  erosaoHidricaSulcoFreq: string;
  erosaoHidricaSulcoProf: string;
  erosaoHidricaSulcoGrau: string;
  erosaoHidricaVocorocas: string;
  desbarrancamento: string;
  desbarrancamentoFreq: string;
  desmoronamento: string;
  desmoronamentoFreq: string;
  movimentoMassa: string;
  movimentoMassaTipo: string;
  drenagem: string;
  vegetacaoPrimariaSBCS: string;
  vegetacaoPrimariaSBCSSelect: string;
  usoAtual: string;
  presencaGilgaiMicrorelevo: string;
  presencaGilgaiMicrorelevoAltura: string;
  presencaGilgaiMicrorelevoFreq: string;
}

const formSchema = yup.object({
  erosao: yup.string().required('Obrigatório'),
  erosaoEolicaForma: yup.string().when('erosao', {
    is: (erosao) => erosao === 'erosaoObser',
    then: yup.string().required('Obrigatório')
  }),
  erosaoEolicaGrau: yup.string().when('erosao', {
    is: (erosao) => erosao === 'erosaoObser',
    then: yup.string().required('Obrigatório')
  }),
  erosaoHidricaLaminar: yup.string().when('erosao', {
    is: (erosao) => erosao === 'erosaoObser',
    then: yup.string().required('Obrigatório')
  }),
  erosaoHidricaSulcoFreq: yup.string().when('erosao', {
    is: (erosao) => erosao === 'erosaoObser',
    then: yup.string().required('Obrigatório')
  }),
  erosaoHidricaSulcoProf: yup.string().when('erosao', {
    is: (erosao) => erosao === 'erosaoObser',
    then: yup.string().required('Obrigatório')
  }),
  erosaoHidricaSulcoGrau: yup.string().when('erosao', {
    is: (erosao) => erosao === 'erosaoObser',
    then: yup.string().required('Obrigatório')
  }),
  erosaoHidricaVocorocas: yup.string().when('erosao', {
    is: (erosao) => erosao === 'erosaoObser',
    then: yup.string().required('Obrigatório')
  }),
  desbarrancamento: yup.string().required('Obrigatório'),
  desbarrancamentoFreq: yup.string().when('desbarrancamento', {
    is: (desbarrancamento) => desbarrancamento === 'desbarrancamentoObser',
    then: yup.string().required('Obrigatório')
  }),
  desmoronamento: yup.string().required('Obrigatório'),
  desmoronamentoFreq: yup.string().when('desmoronamento', {
    is: (desmoronamento) => desmoronamento === 'desmoronamentoObser',
    then: yup.string().required('Obrigatório')
  }),
  movimentoMassa: yup.string().required('Obrigatório'),
  movimentoMassaTipo: yup.string().when('movimentoMassa', {
    is: (movimentoMassa) => movimentoMassa === 'movimentoMassaObser',
    then: yup.string().required('Obrigatório')
  }),
  drenagem: yup.string().required('Obrigatório'),
  vegetacaoPrimariaSBCS: yup.string().required('Obrigatório'),
  vegetacaoPrimariaSBCSSelect: yup.string().when('vegetacaoPrimariaSBCS', {
    is: (vegetacaoPrimariaSBCS) => !!vegetacaoPrimariaSBCS,
    then: yup.string().required('Obrigatório')
  }),
  usoAtual: yup.string().required('Obrigatório'),
  presencaGilgaiMicrorelevo: yup.string().required('Obrigatório'),
  presencaGilgaiMicrorelevoAltura: yup.string().when('presencaGilgaiMicrorelevo', {
    is: (presencaGilgaiMicrorelevo) => presencaGilgaiMicrorelevo === 'presencaGilgaiMicrorelevoObser',
    then: yup.string().required('Obrigatório')
  }),
  presencaGilgaiMicrorelevoFreq: yup.string().when('presencaGilgaiMicrorelevo', {
    is: (presencaGilgaiMicrorelevo) => presencaGilgaiMicrorelevo === 'presencaGilgaiMicrorelevoObser',
    then: yup.string().required('Obrigatório')
  }),
})

interface RouteParams {
  code: number;
}

export default function GeneralDescription2() {
  const navigation = useNavigation();
  const realm = useMainContext()
  const route = useRoute();

  const { code } = route.params as RouteParams;

  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormDataProps>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  })

  const erosaoField = watch("erosao", undefined);
  const desbarrancamentoField = watch("desbarrancamento", undefined);
  const desmoronamentoField = watch("desmoronamento", undefined);
  const movimentoMassaField = watch("movimentoMassa", undefined);
  const presencaGilgaiMicrorelevoField = watch("presencaGilgaiMicrorelevo", undefined);

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
      })

      console.log('sucesso!');
      navigation.navigate('GeneralDescription3', { code })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <VStack bgColor="light.50" safeArea flex={1}>
      <HeaderSimple title="nome do projeto 2" />

      <ScrollView bgColor="light.50" flex={1} px={[5, 64]} showsVerticalScrollIndicator={false}>
        <Center mt={4}>
          <Center p={1} borderWidth={1} borderRadius="3xl" borderColor="gray.300">
            <Center py={2} px={3} rounded="3xl" bg="primary.400">
              <Text fontWeight={500} color="light.50">Descrição geral</Text>
            </Center>
          </Center>
        </Center>

        <Image source={formStep2} alt="Alternate Text" resizeMode="contain" h={7} my={4} />

        <Text fontWeight={500} fontSize="lg" mb={3}>Erosão</Text>

        <VStack borderWidth={1} borderRadius={6} borderColor="gray.300" pt={4} pr={4} pl={4}>
          <Controller
            control={control}
            name="erosao"
            render={({ field: { onChange, value } }) => (
              <Radio.Group name="myRadioGroupErosao" accessibilityLabel="favorite number" value={value} onChange={onChange}>
                <RadioCustom
                  value="erosaoNaoObser"
                  text="Não Observado"
                  showBorder
                />

                <RadioCustom
                  value="erosaoObser"
                  text="Observado"
                  showBorder
                />
              </Radio.Group>
            )}
          />

          <Text color="error.600" fontWeight={400} fontSize="xs">
            {errors.erosao?.message}
          </Text>

          <Divider mb="3" _light={{
            bg: "gray.300"
          }}/>

          {erosaoField === 'erosaoObser' && (
            <VStack mt={1}>
              <Text fontWeight={600} fontSize="md" mb={3}>Eólica</Text>

              <Controller
                control={control}
                name="erosaoEolicaForma"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Forma"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.erosaoEolicaForma?.message}
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
                name="erosaoEolicaGrau"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Grau"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.erosaoEolicaGrau?.message}
                    options={[
                      {
                        label: 'Perfil/Tradagem descrito (a) e coletado (a) em Topo de elevação',
                        value: '1',
                      }
                    ]}
                  />
                )}
              />

              <Divider mb="3" _light={{
                bg: "gray.300"
              }}/>

              <Text fontWeight={600} fontSize="md" mb={3}>Hídrica</Text>

              <Controller
                control={control}
                name="erosaoHidricaLaminar"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Laminar"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.erosaoHidricaLaminar?.message}
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
                name="erosaoHidricaSulcoFreq"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Sulco"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.erosaoHidricaSulcoFreq?.message}
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
                name="erosaoHidricaSulcoProf"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.erosaoHidricaSulcoProf?.message}
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
                name="erosaoHidricaSulcoGrau"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.erosaoHidricaSulcoGrau?.message}
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
                name="erosaoHidricaVocorocas"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Voçorocas"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.erosaoHidricaVocorocas?.message}
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

        <Text fontWeight={500} fontSize="lg" my={3}>Desbarrancamento</Text>

        <VStack borderWidth={1} borderRadius={6} borderColor="gray.300" pt={4} pr={4} pl={4}>
          <Controller
            control={control}
            name="desbarrancamento"
            render={({ field: { onChange, value } }) => (
              <Radio.Group name="myRadioGroupDesbarrancamento" accessibilityLabel="favorite number" value={value} onChange={onChange}>
                <RadioCustom
                  value="desbarrancamentoNaoObser"
                  text="Não Observado"
                  showBorder
                />

                <RadioCustom
                  value="desbarrancamentoObser"
                  text="Observado"
                  showBorder
                />
              </Radio.Group>
            )}
          />

          <Text color="error.600" fontWeight={400} fontSize="xs">
            {errors.desbarrancamento?.message}
          </Text>

          <Divider mb="3" _light={{
            bg: "gray.300"
          }}/>

          {desbarrancamentoField === 'desbarrancamentoObser' && (
            <VStack mt={1}>
              <Controller
                control={control}
                name="desbarrancamentoFreq"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Frequência"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.desbarrancamentoFreq?.message}
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

        <Text fontWeight={500} fontSize="lg" my={3}>Desmoronamento</Text>

        <VStack borderWidth={1} borderRadius={6} borderColor="gray.300" pt={4} pr={4} pl={4}>
          <Controller
            control={control}
            name="desmoronamento"
            render={({ field: { onChange, value } }) => (
              <Radio.Group name="myRadioGroupDesmoronamento" accessibilityLabel="favorite number" value={value} onChange={onChange}>
                <RadioCustom
                  value="desmoronamentoNaoObser"
                  text="Não Observado"
                  showBorder
                />

                <RadioCustom
                  value="desmoronamentoObser"
                  text="Observado"
                  showBorder
                />
              </Radio.Group>
            )}
          />

          <Text color="error.600" fontWeight={400} fontSize="xs">
            {errors.desmoronamento?.message}
          </Text>

          <Divider mb="3" _light={{
            bg: "gray.300"
          }}/>

          {desmoronamentoField === 'desmoronamentoObser' && (
            <VStack mt={1}>
              <Controller
                control={control}
                name="desmoronamentoFreq"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Frequência"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.desmoronamentoFreq?.message}
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

        <Text fontWeight={500} fontSize="lg" my={3}>Movimento de Massa</Text>

        <VStack borderWidth={1} borderRadius={6} borderColor="gray.300" pt={4} pr={4} pl={4}>
          <Controller
            control={control}
            name="movimentoMassa"
            render={({ field: { onChange, value } }) => (
              <Radio.Group name="myRadioGroupMovimentoMassa" accessibilityLabel="favorite number" value={value} onChange={onChange}>
                <RadioCustom
                  value="movimentoMassaNaoObser"
                  text="Não Observado"
                  showBorder
                />

                <RadioCustom
                  value="movimentoMassaObser"
                  text="Observado"
                  showBorder
                />
              </Radio.Group>
            )}
          />

          <Text color="error.600" fontWeight={400} fontSize="xs">
            {errors.movimentoMassa?.message}
          </Text>

          <Divider mb="3" _light={{
            bg: "gray.300"
          }}/>

          {movimentoMassaField === 'movimentoMassaObser' && (
            <VStack mt={1}>
              <Controller
                control={control}
                name="movimentoMassaTipo"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Frequência"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.movimentoMassaTipo?.message}
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

        <VStack mt={1}>
          <Text fontWeight={500} fontSize="lg" mt={3}>Drenagem</Text>

          <Controller
            control={control}
            name="drenagem"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.drenagem?.message}
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

        <Text fontWeight={500} fontSize="lg" mb={3}>Vegetação primária (SBCS)</Text>

        <VStack borderWidth={1} borderRadius={6} borderColor="gray.300" pt={4} pr={4} pl={4}>
          <Controller
            control={control}
            name="vegetacaoPrimariaSBCS"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                onValueChange={onChange}
                selectedValue={value}
                errorMessage={errors.vegetacaoPrimariaSBCS?.message}
                options={[
                  {
                    label: 'Clima Tropical',
                    value: 'climaTropical',
                  }
                ]}
              />
            )}
          />

          <ScrollView h={56} showsVerticalScrollIndicator={false}>
            <Controller
              control={control}
              name="vegetacaoPrimariaSBCSSelect"
              render={({ field: { onChange, value } }) => (
                <Radio.Group name="myRadioGroupVegetacaoPrimariaSBCSSelect" accessibilityLabel="favorite number" value={value} onChange={onChange}>
                    <RadioCustom
                      key="1"
                      value={`vegetacaoPrimariaSBCSSelect-1`}
                      text="Teste vegetacaoPrimariaSBCSSelect"
                      showBorder
                    />
                </Radio.Group>
              )}
            />
          </ScrollView>

          <Text color="error.600" fontWeight={400} fontSize="xs">
            {errors.vegetacaoPrimariaSBCSSelect?.message}
          </Text>
        </VStack>

        <VStack mt={1}>
          <Text fontWeight={500} fontSize="lg" mt={3}>Uso atual</Text>

          <Controller
            control={control}
            name="usoAtual"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                errorMessage={errors.usoAtual?.message}
              />
            )}
          />
        </VStack>

        <Text fontWeight={500} fontSize="lg" my={3}>Presença de Gilgai (microrelevo)</Text>

        <VStack borderWidth={1} borderRadius={6} borderColor="gray.300" pt={4} pr={4} pl={4}>
          <Controller
            control={control}
            name="presencaGilgaiMicrorelevo"
            render={({ field: { onChange, value } }) => (
              <Radio.Group name="myRadioGroupPresencaGilgaiMicrorelevo" accessibilityLabel="favorite number" value={value} onChange={onChange}>
                <RadioCustom
                  value="presencaGilgaiMicrorelevoNaoObser"
                  text="Não Observado"
                  showBorder
                />

                <RadioCustom
                  value="presencaGilgaiMicrorelevoObser"
                  text="Observado"
                  showBorder
                />
              </Radio.Group>
            )}
          />

          <Text color="error.600" fontWeight={400} fontSize="xs">
            {errors.presencaGilgaiMicrorelevo?.message}
          </Text>

          <Divider mb="3" _light={{
            bg: "gray.300"
          }}/>

          {presencaGilgaiMicrorelevoField === 'presencaGilgaiMicrorelevoObser' && (
            <VStack mt={1}>
              <Controller
                control={control}
                name="presencaGilgaiMicrorelevoAltura"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Altura"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.presencaGilgaiMicrorelevoAltura?.message}
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
                name="presencaGilgaiMicrorelevoFreq"
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    title="Frequência"
                    onValueChange={onChange}
                    selectedValue={value}
                    errorMessage={errors.presencaGilgaiMicrorelevoFreq?.message}
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

      </ScrollView>

      <VStack px={[5, 64]}>
        <Button title="Prosseguir" onPress={handleSubmit(subForm)} />
      </VStack>
    </VStack>
  );
};
