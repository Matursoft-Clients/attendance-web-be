import { IsNotEmpty, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class CreateAnnouncementDto {

    uuid: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    slug: string;

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
    thumbnail: FileSystemStoredFile;

    @IsNotEmpty()
    @IsString()
    content: string;
}
