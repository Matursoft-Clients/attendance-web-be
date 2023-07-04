import { AnnouncementEntity } from "./announcement.entity";

export interface AnnouncementDTO {
    uuid: string;
    title: string;
    slug: string;
    content: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface AnnouncementRO {
    announcement: AnnouncementEntity;
}

export interface AnnouncementsRO {
    announcements: AnnouncementEntity[];
}