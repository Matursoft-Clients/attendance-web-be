import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto';
import { AnnouncementDTO } from './announcement.interface';
export declare class AnnouncementService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAnnouncementDto: CreateAnnouncementDto): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        title: string;
        slug: string;
        content: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    findAll(): Promise<AnnouncementDTO[]>;
    findOne(uuid: string): Promise<AnnouncementDTO>;
    update(uuid: string, updateAnnouncementDto: UpdateAnnouncementDto): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        title: string;
        slug: string;
        content: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    remove(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        title: string;
        slug: string;
        content: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
}
