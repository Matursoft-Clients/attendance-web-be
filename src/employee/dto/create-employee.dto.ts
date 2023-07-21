import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length, Matches, MinLength, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

@ValidatorConstraint({ name: 'passwordMatch', async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        const password = (args.object as any).password; // Mendapatkan nilai dari properti "password" di DTO
        const confirmPassword = value;

        if (!password && !confirmPassword) {
            return true;
        }

        return password === confirmPassword;
    }

    defaultMessage(args: ValidationArguments) {
        return `Passwords do not match.`;
    }
}

function ValidatePasswordConfirmation(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'validatePasswordConfirmation',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: PasswordMatchConstraint,
        });
    };
}

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    @Length(16, 16, { message: `NIK must be equals to 16 digits.` })
    nik: string;

    @IsNotEmpty()
    @IsString()
    nrp: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    branch_uuid: string;

    @IsNotEmpty()
    @IsString()
    job_position_uuid: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Whatsapp number is required' })
    @Matches(/^\+62\d+$/, { message: 'Whatsapp number must start with "+62"' })
    @IsPhoneNumber('ID', { message: 'Invalid whatsapp number format' })
    whatsapp_number: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    @ValidatePasswordConfirmation()
    password_confirmation: string;

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
    photo: FileSystemStoredFile;
}

