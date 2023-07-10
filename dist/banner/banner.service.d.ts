import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBannerDto } from './dto';
export declare class BannerService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBannerDto: CreateBannerDto, imageFileName: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        image: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        image: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {})[]>;
    findOne(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        image: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    remove(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        image: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
}
