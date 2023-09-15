import { IsLatitude, IsLongitude, IsNotEmpty, IsString } from "class-validator";

export class CreateCustomAttendanceLocationDto {

    uuid: string;

    @IsNotEmpty()
    employee_uuid: Array<string>;

    @IsNotEmpty()
    start_date: Date;

    @IsNotEmpty()
    end_date: Date;


    @IsNotEmpty()
    @IsString()
    presence_location_address: string;

    @IsNotEmpty()
    @IsLatitude({ message: 'presence_location_latitude must be a longitude number' })
    presence_location_latitude: number;

    @IsNotEmpty()
    @IsLongitude({ message: 'presence_location_longitude must be a longitude number' })
    presence_location_longitude: number;

}
