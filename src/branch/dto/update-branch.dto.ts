import { PartialType } from '@nestjs/swagger';
import { CreateBranchDto } from './create-branch.dto';
import { IsLatitude, IsLongitude, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
    @IsNotEmpty()
    @IsString()
    city_uuid: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 10)
    code: string;

    @IsNotEmpty()
    @IsString()
    presence_location_address: string;

    @IsNotEmpty()
    @IsLatitude()
    presence_location_latitude: number;

    @IsNotEmpty()
    @IsLongitude()
    presence_location_longitude: number;
}
