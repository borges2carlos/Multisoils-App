import Realm from 'realm';

import { GeneralDescFormSchema } from './schemas/GeneralDescFormSchema';
import { ImageFormSchema } from './schemas/ImageFormSchema';
import { VideoFormSchema } from './schemas/VideoFormSchema';
import { CombosSchema, ChronologiesSchema, CitySchema, ClimatesSchema, DatumSchema, CountrySchema, LitologiesSchema, ScaleSchema, ObservationTypeSchema, StateSchema, TypeChronologySchema, TypeClimatesSchema, TypeLitologySchema, SpindleSchema } from './schemas/CombosSchema';
import { MyProjectSchema } from './schemas/MyProjectSchema';

export const getRealm = async () => await Realm.open({
  path: 'multi-soils-app-db',
  schema: [GeneralDescFormSchema, ImageFormSchema, VideoFormSchema, CombosSchema, ChronologiesSchema, CitySchema, ClimatesSchema, DatumSchema, CountrySchema, LitologiesSchema, ScaleSchema, ObservationTypeSchema, StateSchema, TypeChronologySchema, TypeClimatesSchema, TypeLitologySchema, SpindleSchema, MyProjectSchema],
  deleteRealmIfMigrationNeeded: true, // todo remover
});
