import { PrismaService } from 'src/prisma/prisma.service';
export declare class DailyAttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(status: string, start_date: string, end_date: string): Promise<any[]>;
    findEmployeeByUuid(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
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
