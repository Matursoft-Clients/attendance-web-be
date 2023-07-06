import { IsNotEmpty, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class CreateBannerDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
    image: FileSystemStoredFile;
}
