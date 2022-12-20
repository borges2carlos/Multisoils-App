const CCLIMA = []
const CLITOLOGIA = [];

CCLIMA['climaTropical'] = [
  {
    indice: '1.1',
    subcategoria: 'Clima tropical úmido ou clima equatorial',
    codigo: 'AF',
  },
  {
    indice: '1.2',
    subcategoria: 'Clima de monção',
    codigo: 'AM',
  },{
    indice: '1.3',
    subcategoria: 'Clima tropical com estação seca de Inverno',
    codigo: 'AW',
  },{
    indice: '1.4',
    subcategoria: 'Clima tropical com estação seca de Verão',
    codigo: 'AS',
  },
]

CCLIMA['climaArido'] = [
  {
    indice: '2.1',
    subcategoria: 'Clima das estepes',
    codigo: 'BS',
  },
  {
    indice: '2.2',
    subcategoria: 'Clima das estepes quentes de baixa latitude e altitude',
    codigo: 'BSh',
  },{
    indice: '2.3',
    subcategoria: 'Clima das estepes frias de média latitude e grande altitude',
    codigo: 'BSk',
  },{
    indice: '2.4',
    subcategoria: 'Clima desértico',
    codigo: 'Bw',
  },{
    indice: '2.5',
    subcategoria: 'Clima das regiões desérticas quentes de baixa latitude e altitude',
    codigo: 'BWh',
  },{
    indice: '2.6',
    subcategoria: 'Clima das regiões desérticas frias das latitudes médias ou de grande altitude',
    codigo: 'BWk',
  },
]

CCLIMA['climaOceanico'] = [
  {
    indice: '3.1',
    subcategoria: 'Clima temperado úmido sem estação seca',
    codigo: 'Cf',
  },
  {
    indice: '3.2',
    subcategoria: 'Clima temperado úmido com verão quente',
    codigo: 'Cfa',
  },{
    indice: '3.3',
    subcategoria: 'Clima temperado úmido com verão temperado',
    codigo: 'Cfb',
  },{
    indice: '3.4',
    subcategoria: 'Clima temperado úmido com Verão curto e fresco',
    codigo: 'Cfc',
  },{
    indice: '3.5',
    subcategoria: 'Clima temperado úmido com Inverno seco',
    codigo: 'Cw',
  },{
    indice: '3.6',
    subcategoria: 'Clima temperado úmido com inverno seco e verão quente',
    codigo: 'Cwa',
  },{
    indice: '3.7',
    subcategoria: 'Clima temperado úmido com inverno seco e verão temperado',
    codigo: 'Cwb',
  },{
    indice: '3.8',
    subcategoria: 'Clima temperado úmido com inverno seco e verão curto e fresco',
    codigo: 'Cwc',
  },{
    indice: '3.9',
    subcategoria: 'Clima temperado úmido com verão seco (clima mediterrânico)',
    codigo: 'Cs',
  },{
    indice: '3.10',
    subcategoria: 'Clima temperado úmido com verão seco e quente',
    codigo: 'Csa',
  },{
    indice: '3.11',
    subcategoria: 'Clima temperado úmido com verão seco e temperado',
    codigo: 'Csb',
  },{
    indice: '3.12',
    subcategoria: 'Clima temperado úmido com verão seco, curto e fresco',
    codigo: 'Csc',
  },
]

CCLIMA['climaContinentalTemperadosFrios'] = [
  {
    indice: '4.1',
    subcategoria: 'Clima temperado frio sem estação seca',
    codigo: 'Df',
  },
  {
    indice: '4.2',
    subcategoria: 'Clima temperado frio sem estação seca e com verão quente',
    codigo: 'Dfa',
  },{
    indice: '4.3',
    subcategoria: 'Clima temperado frio sem estação seca e com Verão temperado',
    codigo: 'Dfb',
  },{
    indice: '4.4',
    subcategoria: 'Clima temperado frio sem estação seca e com verão curto e fresco',
    codigo: 'Dfc',
  },{
    indice: '4.5',
    subcategoria: 'Clima temperado frio sem estação seca e com Inverno muito frio',
    codigo: 'Dfd',
  },{
    indice: '4.6',
    subcategoria: 'Clima temperado frio com inverno seco',
    codigo: 'Dw',
  },{
    indice: '4.7',
    subcategoria: 'Clima temperado frio com Inverno seco e com Verão quente',
    codigo: 'Dwa',
  },{
    indice: '4.8',
    subcategoria: 'Clima temperado frio com Inverno seco e com Verão temperado',
    codigo: 'Dwb',
  },{
    indice: '4.9',
    subcategoria: 'Clima temperado frio com Inverno seco e com Verão curto e fresco',
    codigo: 'Dwc',
  },{
    indice: '4.10',
    subcategoria: 'Clima temperado frio com Inverno seco e muito frio',
    codigo: 'Dwd',
  }
]

CCLIMA['climaGlacial'] = [
  {
    indice: '5.1',
    subcategoria: 'Clima de tundra',
    codigo: 'ET',
  },{
    indice: '5.2',
    subcategoria: 'Clima das calotas polares',
    codigo: 'EF',
  },{
    indice: '5.3',
    subcategoria: 'Clima das altas montanhas',
    codigo: 'EM',
  },
]

CLITOLOGIA['rochaIgnea'] = [
  {
    label: 'Ácida',
    value: 'acida',
  },{
    label: 'Intermediária',
    value: 'intermediaria',
  },{
    label: 'Básica',
    value: 'basica',
  },{
    label: 'Ultrabásica',
    value: 'ultrabasica',
  },{
    label: 'Piroclástcia',
    value: 'piroclastcia',
  },
]

CLITOLOGIA['rochaMetamorfica'] = [
  {
    label: 'Ácida',
    value: 'acida',
  },{
    label: 'Básica',
    value: 'basica',
  },{
    label: 'Ultrabásica',
    value: 'ultrabasica',
  }
]

CLITOLOGIA['rochaSedimentar'] = [
  {
    label: 'Clástica',
    value: 'clastica',
  },{
    label: 'Carbonatada, orgânica',
    value: 'carbonatadaOrganica',
  },{
    label: 'Evaporitos',
    value: 'evaporitos',
  }
]

CLITOLOGIA['rochasNaoConsolidadas'] = [
  {
    label: 'Resíduos intemperizados',
    value: 'residuosIntemperizados',
  },{
    label: 'Fluvial',
    value: 'fluvial',
  },{
    label: 'Lacustrina',
    value: 'lacustrina',
  },{
    label: 'Marinha e estuarína',
    value: 'marinhaEstuarína',
  },{
    label: 'Coluvial',
    value: 'coluvial',
  },{
    label: 'Eólica',
    value: 'eolica',
  },{
    label: 'Glacial',
    value: 'glacial',
  },{
    label: 'Criogênico',
    value: 'criogenico',
  },{
    label: 'Orgânico',
    value: 'organico',
  },{
    label: 'Antropogênico/ Tecnogênico',
    value: 'antropogenicoTecnogenico',
  },{
    label: 'Não especificado',
    value: 'naoEspecificado',
  }
]

CLITOLOGIA['rochaIgnea-acida'] = [
  {
    label: 'Granito',
    value: 'granito',
  },{
    label: 'Quartzo-Diorito',
    value: 'quartzoDiorito',
  },{
    label: 'Grano-Diorito',
    value: 'granoDiorito',
  },{
    label: 'Sienito',
    value: 'sienito',
  },{
    label: 'Riolito',
    value: 'riolito',
  },{
    label: 'Diorito',
    value: 'diorito',
  },
]

CLITOLOGIA['rochaIgnea-intermediaria'] = [
  {
    label: 'Andesito, Traquito, Fonolito',
    value: 'andesitoTraquitoFonolito',
  },{
    label: 'Diorito-Sienito',
    value: 'dioritoSienito',
  }
]

CLITOLOGIA['rochaIgnea-basica'] = [
  {
    label: 'Gabro',
    value: 'gabro',
  },{
    label: 'Basalto',
    value: 'basalto',
  },{
    label: 'Dolerito/Diabásio',
    value: 'doleritoDiabasio',
  }
]

CLITOLOGIA['rochaIgnea-ultrabasica'] = [
  {
    label: 'Peridotito',
    value: 'Peridotito',
  },{
    label: 'Piroxenita',
    value: 'Piroxenita',
  },{
    label: 'Ilmenita, Magnetita,Ironstone, Serpentina',
    value: 'ilmenitaMagnetitaIronstoneSerpentina',
  }
]

CLITOLOGIA['rochaIgnea-piroclastcia'] = [
  {
    label: 'Tufo',
    value: 'tufo',
  },{
    label: 'Escória vulcânica/brecha',
    value: 'escoriaVulcanicaBrecha',
  },{
    label: 'Cinza vulcânica',
    value: 'cinzaVulcanica',
  },{
    label: 'Ignimbrito',
    value: 'ignimbrito',
  }
]

export { CCLIMA, CLITOLOGIA };
