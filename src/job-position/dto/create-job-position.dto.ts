import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateJobPositionDto {

    uuid: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 10)
    code: string;
}
