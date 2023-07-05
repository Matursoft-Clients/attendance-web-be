export interface AnnouncementDTO {
    uuid: string;
    title: string;
    slug: string;
    content: string;
    created_at?: Date;
    updated_at?: Date;
}