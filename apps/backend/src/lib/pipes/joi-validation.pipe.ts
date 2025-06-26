import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { Schema } from 'joi';
import { JOI_SCHEMA_KEY } from '../decorators/joi-dto-schema.decorator.js';
import type { JoiValidationOptions } from '../interfaces/joi-validation-options.interface.js';


@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private options?: JoiValidationOptions) { }

    transform(value: unknown, metadata: ArgumentMetadata) {

        const { metatype } = metadata; // confirm if there is a schema
        if (!metatype) return value;

        const schema: Schema = Reflect.getMetadata(JOI_SCHEMA_KEY, metatype); // get the schema
        if (!schema) return value;

        const result = schema.validate(value, {  // validate the schema
            abortEarly: this.options?.abortEarly || false,    // doesnt stop on the first error
            allowUnknown: this.options?.allowUnknown || false, // doesnt allow extra properties
        });

        if (result.error) {      // error handling
            let errorMessages = ""
            result.error.details.forEach(error => {
                errorMessages += error.message + " || "
            });

            throw new BadRequestException(`Validation Error ${errorMessages}`)
        }

        return result.value;
    }
}
    