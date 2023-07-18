import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MinLength, Validate, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { FileSystemStoredFile } from 'nestjs-form-data';

@ValidatorConstraint({ name: 'passwordMatch', async: false })
export class UpdatePasswordMatchConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        const password = (args.object as any).password; // Mendapatkan nilai dari properti "password" di DTO
        const confirmPassword = value;

        console.log(confirmPassword)

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
            validator: UpdatePasswordMatchConstraint,
        });
    };
}

export class UpdateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    branch_uuid: string;

    @IsNotEmpty()
    @IsString()
    job_position_uuid: string;

    @IsNotEmpty({ message: 'Whatsapp number is required' })
    @Matches(/^\+62\d+$/, { message: 'Whatsapp number must start with "+62"' })
    @IsPhoneNumber('ID', { message: 'Invalid whatsapp number format' })
    whatsapp_number: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    password?: string;

    @IsOptional()
    @IsString()
    @ValidatePasswordConfirmation()
    password_confirmation?: string;

    @IsOptional()
    @Validate(validateImageFile) // Validasi custom untuk file gambar
    photo?: FileSystemStoredFile; // Tambahkan tanda tanya (?) untuk mengindikasikan bahwa field boleh kosong
}

// Custom validator untuk validasi file gambar
function validateImageFile(value: FileSystemStoredFile) {
    console.log(value)
    if (!value) {
        return true;
    }

    const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = 1e6; // 1MB

    if (!validExtensions.includes(value.mimetype)) {
        return false;
    }

    if (value.size > maxFileSize) {
        return false;
    }

    return true;
}
