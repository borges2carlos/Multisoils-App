export type TCombos = {
  _id: string,
  observationType: {
    index: string,
    value: string
  }[],
  scale: {
    index: string,
    value: string
  }[],
  datum: {
    id: number,
    name: string,
    ellipsoid: string,
    region_use: string,
  }[],
  spindle: {
    id: number,
    n_hemisphere: string,
    s_hemisphere: string
  }[],
  country: {
    id: number,
    country: string,
  }[],
  state: {
    id: number,
    country_id: number,
    state: string
  }[],
  city: {
    id: number,
    state_id: number,
    city: string
  }[],
  type_climates: {
    index: string,
    value: string
  }[],
  climates: {
    id: number,
    type: string,
    index: string,
    subcategory: string,
    code: string
  }[],
  type_litology: {
    index: string,
    value: string
  }[],
  litologies: {
    id: number,
    class: string,
    group: string,
    type_rock: string
  }[],
  type_chronology: {
    index: string,
    value: string
  }[],
  chronologies: {
    id: number,
    eon: string,
    age: string,
    period: string,
    time: string,
    years: string
  }[],
}

export const ObservationTypeSchema = {
  name: "ObservationType",
  properties: {
    index: "string",
    value: "string"
  },
}

export const ScaleSchema = {
  name: "Scale",
  properties: {
    index: "string",
    value: "string"
  },
}

export const DatumSchema = {
  name: "Datum",
  properties: {
    id: "int",
    name: "string",
    ellipsoid: "string",
    region_use: "string",
  },
}

export const TypeClimatesSchema = {
  name: "TypeClimates",
  properties: {
    index: "string",
    value: "string"
  },
}

export const TypeLitologySchema = {
  name: "TypeLitology",
  properties: {
    index: "string",
    value: "string"
  },
}

export const TypeChronologySchema = {
  name: "TypeChronology",
  properties: {
    index: "string",
    value: "string"
  },
}

export const SpindleSchema = {
  name: "Spindle",
  properties: {
    id: "int",
    n_hemisphere: "string",
    s_hemisphere: "string",
  },
}

export const CountrySchema = {
  name: "Country",
  properties: {
    id: "int",
    country: "string",
  },
}

export const StateSchema = {
  name: "State",
  properties: {
    id: "int",
    country_id: "int",
    state: "string"
  },
}

export const CitySchema = {
  name: "City",
  properties: {
    id: "int",
    state_id: "int",
    city: "string"
  },
}

export const ClimatesSchema = {
  name: "Climates",
  properties: {
    id: "int",
    type: "string",
    index: "string",
    subcategory: "string",
    code: "string"
  },
}

export const LitologiesSchema = {
  name: "Litologies",
  properties: {
    id: "int",
    class: "string",
    group: "string",
    type_rock: "string"
  },
}

export const ChronologiesSchema = {
  name: "Chronologies",
  properties: {
    id: "int",
    eon: "string",
    age: "string",
    period: "string",
    time: "string",
    years: "string"
  },
}

export const CombosSchema = {
  name: "Combos",
  properties: {
    _id: "string",

    observationType: "ObservationType[]",
    scale: "Scale[]",
    datum: "Datum[]",
    spindle: "Spindle[]",
    country: "Country[]",
    state: "State[]",
    city: "City[]",
    type_climates: "TypeClimates[]",
    climates: "Climates[]",
    type_litology: "TypeLitology[]",
    litologies: "Litologies[]",
    type_chronology: "TypeChronology[]",
    chronologies: "Chronologies[]",
  },
  primaryKey: "_id",
}
