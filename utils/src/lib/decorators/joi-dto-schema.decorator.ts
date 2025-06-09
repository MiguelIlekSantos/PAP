import { Schema } from 'joi';
import 'reflect-metadata'

export const JOI_SCHEMA_KEY = 'joi:schema';

export function JoiDtoSchema(schema: Schema) {
  return Reflect.metadata(JOI_SCHEMA_KEY, schema);
}
