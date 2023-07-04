import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

@Entity('announcement')
export class AnnouncementEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created_at?: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at?: Date;
}