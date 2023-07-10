import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        email: string;
        password: string;
        photo: string;
        remember_token: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    findUserByEmail(email: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        email: string;
        password: string;
        photo: string;
        remember_token: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    update(uuid: string, updateUserDto: UpdateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        email: string;
        password: string;
        photo: string;
        remember_token: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    updateUserPhoto(uuid: string, photoName: string): Promise<void>;
}
