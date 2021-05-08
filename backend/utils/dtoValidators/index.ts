import { BadRequestException, HttpStatus } from "@nestjs/common";
import { ApiErrorCode } from "app-types/global";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, registerDecorator, ValidatorConstraintInterface } from "class-validator";

export const formError = (path: string, message: ApiErrorCode) => {
  throw new BadRequestException({ code: HttpStatus.BAD_REQUEST, message: [{ path, message }] });
}

export const formErrors = (message: { path: string, message: ApiErrorCode }[]) => {
  throw new BadRequestException({ code: HttpStatus.BAD_REQUEST, message });
}

export const tooLong = {
  message: (args: ValidationArguments) => {
    if (args.value.length > args.constraints[0]) {
      return `{"key": "formErrors.text_to_long", "args": "${args.constraints[0]}"}`;
    }
  },
};

export const tooShort = {
  message: (args: ValidationArguments) => {
    if (args.value.length < args.constraints[0]) {
      return `{"key": "formErrors.text_to_short", "args": "${args.constraints[0]}"}`;
    }
  },
}; 

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}
//@ts-ignore
@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
}

