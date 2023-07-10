import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class EmployeeService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEmployeeDto: CreateEmployeeDto, photoFileName: string): Promise<import("@prisma/client/runtime").GetResult<{
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
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        uuid: string;
        job_position_uuid: string;
        name: string;
        email: string;
        password: string;
        photo: string;
        token: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {})[]>;
    findOne(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
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
    findEmployeeByEmail(email: string): Promise<import("@prisma/client/runtime").GetResult<{
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
    findJobPositionByUuid(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        name: string;
        code: string;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    update(uuid: string, updateEmployeeDto: UpdateEmployeeDto): Promise<import("@prisma/client/runtime").GetResult<{
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
    updateEmployeePhoto(uuid: string, photoFileName: string): Promise<void>;
    remove(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
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
}
