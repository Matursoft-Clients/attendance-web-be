import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    job_position_uuid: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
    photo: FileSystemStoredFile;
}

