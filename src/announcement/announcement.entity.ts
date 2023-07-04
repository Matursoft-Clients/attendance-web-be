import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

    @UpdateDateColumn()
    updated_at: Date;
}
