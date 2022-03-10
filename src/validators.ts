import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class ValidationResult {
    data: any;
    error: any;
}

export async function validateAndConvert(classToConvert: any, body: string) {
    const result = new ValidationResult();
    result.data = plainToClass(classToConvert, body);
    await validate(result.data, { skipMissingProperties: true, validationError: {target: true, value: true} }).then(errors => {
        // errors is an array of validation errors
        if (errors.length > 0) {
            let errorTexts = Array();
            for (const errorItem of errors) {
                errorTexts = errorTexts.concat(errorItem.constraints);
            }
            result.error = errorTexts;
            return result;
        }
    });
    return result;
}