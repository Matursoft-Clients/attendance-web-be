import { CreateCustomAttendanceLocationDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CustomAttendanceLocationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCustomAttendanceLocationDto: CreateCustomAttendanceLocationDto): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        employee_uuid: string;
        start_date: Date;
        end_date: Date;
        presence_location_address: string;
        presence_location_latitude: number;
        presence_location_longitude: number;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    findAll(): Promise<any[]>;
    findOne(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        employee_uuid: string;
        start_date: Date;
        end_date: Date;
        presence_location_address: string;
        presence_location_latitude: number;
        presence_location_longitude: number;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
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
    remove(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        employee_uuid: string;
        start_date: Date;
        end_date: Date;
        presence_location_address: string;
        presence_location_latitude: number;
        presence_location_longitude: number;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
}
