import { useEffect, useState } from 'react';
import { ScrollView, VStack, Text, HStack } from 'native-base';

import Button from '../components/Button';
import Header from '../components/Header';
import ButtonBack from '../components/ButtonBack';
import { TGeneralDescForm } from '../databases/schemas/GeneralDescFormSchema';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMainContext } from '../contexts/RealmContext';

interface RouteParams {
  code: number;
}

export default function SendProject() {
  const navigation = useNavigation();
  const [project, setProject] = useState<TGeneralDescForm>();
  const realm = useMainContext()
  const route = useRoute();

  const { code } = route.params as RouteParams;

  async function getProject() {
    if (!realm) return;

    try {
      const projectData = realm
        .objects<TGeneralDescForm[]>('GeneralDescForm')
        .filtered(`code = '${code}'`)
        .toJSON();

      setProject(projectData[0] as TGeneralDescForm);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getProject()
  }, [realm])

  return (
    <VStack bgColor="light.50" safeArea flex={1}>
      <Header />

      <VStack bgColor="light.50" px={[5, 5]} mt={4}>
        <ButtonBack />
      </VStack>

      {!!project && (
        <ScrollView bgColor="light.50" flex={1} px={[5, 64]} showsVerticalScrollIndicator={false}>

          <Text fontWeight={600} fontSize="md" mb={3}>Confirme as informações antes de enviar</Text>

          <Text fontWeight={600} fontSize="lg" mb={3}>{project.code}</Text>

          <Text fontWeight={600} fontSize="md" mb={3}>Descrição Geral</Text>

          <Text fontWeight={500} fontSize="lg">1. informações gerais</Text>
          <Text fontWeight={400} fontSize="sm">Data: {project.date}</Text>
          <Text fontWeight={400} fontSize="sm">Classificação taxo: {project.claTaxo}</Text>
          <Text fontWeight={400} fontSize="sm">Unidade de Mapeamento: {project.uniMape}</Text>
          <Text fontWeight={400} fontSize="sm">Articulação/Folha {project.artiFolh}</Text>
          <Text fontWeight={400} fontSize="sm">Escala {project.escala}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>2. </Text>
          <Text fontWeight={400} fontSize="sm">{project.utmLat}</Text>
          <Text fontWeight={400} fontSize="sm">{project.utmLng}</Text>
          <Text fontWeight={400} fontSize="sm">{project.datum}</Text>
          <Text fontWeight={400} fontSize="sm">{project.fusos}</Text>
          <Text fontWeight={400} fontSize="sm">{project.altitude}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>3. </Text>
          <Text fontWeight={400} fontSize="sm">{project.pais}</Text>
          <Text fontWeight={400} fontSize="sm">{project.estado}</Text>
          <Text fontWeight={400} fontSize="sm">{project.munincipio}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>4. </Text>
          <Text fontWeight={400} fontSize="sm">{project.situacaoTextInput || project.situacaoSelectInput}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>5. </Text>
          <Text fontWeight={400} fontSize="sm">{project.declividade}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>6. </Text>
          <Text fontWeight={400} fontSize="sm">{project.coberturaVegetal}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>7. </Text>
          <Text fontWeight={400} fontSize="sm">{project.clima}</Text>
          <Text fontWeight={400} fontSize="sm">{project.climaSelect}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>8. </Text>
          <Text fontWeight={400} fontSize="sm">{project.litoClassePrincipal}</Text>
          <Text fontWeight={400} fontSize="sm">{project.litoGrupoPrincipal}</Text>
          <Text fontWeight={400} fontSize="sm">{project.litoTipoRocha}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>9. </Text>
          <Text fontWeight={400} fontSize="sm">{project.unidadeLitoestatigrafica}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>10. </Text>
          <Text fontWeight={400} fontSize="sm">{project.materialOriginario}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>11. </Text>
          <Text fontWeight={400} fontSize="sm">{project.eon}</Text>
          <Text fontWeight={400} fontSize="sm">{project.era}</Text>
          <Text fontWeight={400} fontSize="sm">{project.periodo}</Text>
          <Text fontWeight={400} fontSize="sm">{project.epoca}</Text>
          <Text fontWeight={400} fontSize="sm">{project.milhoesAnos}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>12. </Text>
          <Text fontWeight={400} fontSize="sm">{project.rochosidade}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>13. </Text>
          <Text fontWeight={400} fontSize="sm">{project.relevoLocal}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>14. </Text>
          <Text fontWeight={400} fontSize="sm">{project.relevoRegional}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>15. </Text>
          <Text fontWeight={400} fontSize="sm">{project.erosaoEolicaForma}</Text>
          <Text fontWeight={400} fontSize="sm">{project.erosaoEolicaGrau}</Text>
          <Text fontWeight={400} fontSize="sm">{project.erosaoHidricaLaminar}</Text>
          <Text fontWeight={400} fontSize="sm">{project.erosaoHidricaSulcoFreq}</Text>
          <Text fontWeight={400} fontSize="sm">{project.erosaoHidricaSulcoProf}</Text>
          <Text fontWeight={400} fontSize="sm">{project.erosaoHidricaSulcoGrau}</Text>
          <Text fontWeight={400} fontSize="sm">{project.erosaoHidricaVocorocas}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>16. </Text>
          <Text fontWeight={400} fontSize="sm">{project.desbarrancamentoFreq}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>17. </Text>
          <Text fontWeight={400} fontSize="sm">{project.desmoronamentoFreq}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>18. </Text>
          <Text fontWeight={400} fontSize="sm">{project.movimentoMassaTipo}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>19. </Text>
          <Text fontWeight={400} fontSize="sm">{project.drenagem}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>20. </Text>
          <Text fontWeight={400} fontSize="sm">{project.vegetacaoPrimariaSBCSSelect}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>21. </Text>
          <Text fontWeight={400} fontSize="sm">{project.usoAtual}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>22. </Text>
          <Text fontWeight={400} fontSize="sm">{project.presencaGilgaiMicrorelevoFreq}</Text>
          <Text fontWeight={400} fontSize="sm">{project.presencaGilgaiMicrorelevoAltura}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>23. </Text>
          <Text fontWeight={400} fontSize="sm">{project.rachadurasSuperficiaisDistanciaRachadura}</Text>
          <Text fontWeight={400} fontSize="sm">{project.rachadurasSuperficiaisDistanciaRachaduraCriterio}</Text>
          <Text fontWeight={400} fontSize="sm">{project.rachadurasSuperficiaisProfundidade}</Text>
          <Text fontWeight={400} fontSize="sm">{project.rachadurasSuperficiaisProfundidadeCriterio}</Text>
          <Text fontWeight={400} fontSize="sm">{project.rachadurasSuperficiaisLargura}</Text>
          <Text fontWeight={400} fontSize="sm">{project.rachadurasSuperficiaisLarguraCriterio}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>24. </Text>
          <Text fontWeight={400} fontSize="sm">{project.presencaSaisSuperficieCoberturaSuper}</Text>
          <Text fontWeight={400} fontSize="sm">{project.presencaSaisSuperficieCoberturaSuperCriterio}</Text>
          <Text fontWeight={400} fontSize="sm">{project.presencaSaisSuperficieEspessura}</Text>
          <Text fontWeight={400} fontSize="sm">{project.presencaSaisSuperficieEspessuraCriterio}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>25. </Text>
          <Text fontWeight={400} fontSize="sm">{project.descritoColetado}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>26. </Text>
          <Text fontWeight={400} fontSize="sm">{project.observacoes}</Text>

          <Text fontWeight={500} fontSize="lg" mt={3}>27. </Text>
          <Text fontWeight={400} fontSize="sm">Fotos: {project.images.length}</Text>
          <Text fontWeight={400} fontSize="sm">Vídeos: {project.videos.length}</Text>

          <HStack px={[5, 64]} justifyContent="space-between">
            <Button title="Voltar" w="45%" onPress={navigation.goBack} />
            {!project.statusSync && (
              <Button title="Confirmar" w="45%" onPress={() => {}} />
            )}
          </HStack>
        </ScrollView>
      )}
    </VStack>
  );
};
