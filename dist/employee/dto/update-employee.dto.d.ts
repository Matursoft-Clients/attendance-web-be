import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { FileSystemStoredFile } from 'nestjs-form-data';
export declare class UpdatePasswordMatchConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class UpdateEmployeeDto {
    name: string;
    email: string;
    job_position_uuid: string;
    password?: string;
    password_confirmation?: string;
    photo?: FileSystemStoredFile;
}
