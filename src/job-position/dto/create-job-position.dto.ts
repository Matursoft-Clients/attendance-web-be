import { IsNotEmpty, IsString } from "class-validator";

export class CreateJobPositionDto {

    uuid: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    code: string;
}
