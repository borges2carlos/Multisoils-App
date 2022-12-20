import { TImageForm } from './ImageFormSchema';
import { TVideoForm } from './VideoFormSchema';
import { ObjectSchema } from 'realm';

export type TGeneralDescForm = {
  _id: string,
  statusSync?: boolean,
  created_at: Date,
  updated_at: Date,
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
  situacaoTextInput?: string;
  situacaoSelectInput?: string;
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

  erosao?: string;
  erosaoEolicaForma?: string;
  erosaoEolicaGrau?: string;
  erosaoHidricaLaminar?: string;
  erosaoHidricaSulcoFreq?: string;
  erosaoHidricaSulcoProf?: string;
  erosaoHidricaSulcoGrau?: string;
  erosaoHidricaVocorocas?: string;
  desbarrancamento?: string;
  desbarrancamentoFreq?: string;
  desmoronamento?: string;
  desmoronamentoFreq?: string;
  movimentoMassa?: string;
  movimentoMassaTipo?: string;
  drenagem?: string;
  vegetacaoPrimariaSBCS?: string;
  vegetacaoPrimariaSBCSSelect?: string;
  usoAtual?: string;
  presencaGilgaiMicrorelevo?: string;
  presencaGilgaiMicrorelevoAltura?: string;
  presencaGilgaiMicrorelevoFreq?: string;

  rachadurasSuperficiais?: string;
  rachadurasSuperficiaisLargura?: string;
  rachadurasSuperficiaisLarguraCriterio?: string;
  rachadurasSuperficiaisProfundidade?: string;
  rachadurasSuperficiaisProfundidadeCriterio?: string;
  rachadurasSuperficiaisDistanciaRachadura?: string;
  rachadurasSuperficiaisDistanciaRachaduraCriterio?: string;
  presencaSaisSuperficie?: string;
  presencaSaisSuperficieCoberturaSuper?: string;
  presencaSaisSuperficieCoberturaSuperCriterio?: string;
  presencaSaisSuperficieEspessura?: string;
  presencaSaisSuperficieEspessuraCriterio?: string;
  descritoColetado?: string;
  observacoes?: string;

  images?: TImageForm[];
  videos?: TVideoForm[];
}

export const GeneralDescFormSchema: ObjectSchema = {
  name: "GeneralDescForm",
  properties: {
    _id: "string",
    typeObservation: "string",
    code: "string",
    date: "string",
    claTaxo: "string",
    uniMape: "string",
    artiFolh: "string",
    escala: "string",
    geoLat: "string",
    geoLng: "string",
    utmLat: "string",
    utmLng: "string",
    datum: "string",
    fusos: "string",
    altitude: "string",
    pais: "string",
    estado: "string",
    munincipio: "string",
    situacao: "string",
    situacaoTextInput: "string?",
    situacaoSelectInput: "string?",
    declividade: "string",
    coberturaVegetal: "string",
    clima: "string",
    climaSelect: "string",
    litoClassePrincipal: "string",
    litoGrupoPrincipal: "string",
    litoTipoRocha: "string",
    unidadeLitoestatigrafica: "string",
    materialOriginario: "string",
    eon: "string",
    era: "string",
    periodo: "string",
    epoca: "string",
    milhoesAnos: "string",
    rochosidade: "string",
    relevoLocal: "string",
    relevoRegional: "string",

    erosao: "string?",
    erosaoEolicaForma: "string?",
    erosaoEolicaGrau: "string?",
    erosaoHidricaLaminar: "string?",
    erosaoHidricaSulcoFreq: "string?",
    erosaoHidricaSulcoProf: "string?",
    erosaoHidricaSulcoGrau: "string?",
    erosaoHidricaVocorocas: "string?",
    desbarrancamento: "string?",
    desbarrancamentoFreq: "string?",
    desmoronamento: "string?",
    desmoronamentoFreq: "string?",
    movimentoMassa: "string?",
    movimentoMassaTipo: "string?",
    drenagem: "string?",
    vegetacaoPrimariaSBCS: "string?",
    vegetacaoPrimariaSBCSSelect: "string?",
    usoAtual: "string?",
    presencaGilgaiMicrorelevo: "string?",
    presencaGilgaiMicrorelevoAltura: "string?",
    presencaGilgaiMicrorelevoFreq: "string?",

    rachadurasSuperficiais: "string?",
    rachadurasSuperficiaisLargura: "string?",
    rachadurasSuperficiaisLarguraCriterio: "string?",
    rachadurasSuperficiaisProfundidade: "string?",
    rachadurasSuperficiaisProfundidadeCriterio: "string?",
    rachadurasSuperficiaisDistanciaRachadura: "string?",
    rachadurasSuperficiaisDistanciaRachaduraCriterio: "string?",
    presencaSaisSuperficie: "string?",
    presencaSaisSuperficieCoberturaSuper: "string?",
    presencaSaisSuperficieCoberturaSuperCriterio: "string?",
    presencaSaisSuperficieEspessura: "string?",
    presencaSaisSuperficieEspessuraCriterio: "string?",
    descritoColetado: "string?",
    observacoes: "string?",

    images: "ImageForm[]",
    videos: "VideoForm[]",

    statusSync: "bool?",
    created_at: "date",
    updated_at: "date",
  },
  primaryKey: "_id",
}
