import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    uuid: string;

    @Column()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({ default: '' })
    photo: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }
}