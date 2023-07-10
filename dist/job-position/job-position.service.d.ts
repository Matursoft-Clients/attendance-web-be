import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobPositionDto, UpdateJobPositionDto } from './dto';
export declare class JobPositionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createJobPositionDto: CreateJobPositionDto): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        code: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        code: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {})[]>;
    findOne(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        code: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    findJobPositionInEmployee(job_position_uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        job_position_uuid: string;
        name: string;
        email: string;
        password: string;
        photo: string;
        token: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    update(uuid: string, updateJobPositionDto: UpdateJobPositionDto): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        code: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    remove(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        code: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
}
