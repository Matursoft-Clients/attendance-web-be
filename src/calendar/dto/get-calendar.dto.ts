import { IsNotEmpty, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@ValidatorConstraint({ name: 'isYearMonth', async: false })
export class IsYearMonthConstraint implements ValidatorConstraintInterface {
    validate(value: any) {
        if (!value) {
            return false;
        }

        const regex = /^\d{4}-\d{2}$/;
        if (!regex.test(value)) {
            return false;
        }

        const [year, month] = value.split('-');
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10);

        if (parsedYear < 1 || parsedYear > 9999 || parsedMonth < 1 || parsedMonth > 12) {
            return false;
        }

        return true;
    }

    defaultMessage(validationArguments: ValidationArguments) {
        return `${validationArguments.property} must be in the format YYYY-MM`;
    }
}

export function IsYearMonth(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isYearMonth',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsYearMonthConstraint,
        });
    };
}

export class GetCalendarDto {

    @IsNotEmpty()
    @IsYearMonth()
    date: string;

    @IsNotEmpty()
    employee_uuid: string;
}