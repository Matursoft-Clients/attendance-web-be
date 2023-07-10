import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";
export declare class PasswordMatchConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class CreateEmployeeDto {
    name: string;
    job_position_uuid: string;
    email: string;
    password: string;
    password_confirmation: string;
    photo: FileSystemStoredFile;
}
