import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnnouncementDto {

    uuid: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    slug: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    created_at: Date;

    updated_at: Date;

}
