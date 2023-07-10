import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSettingDto } from './dto';
export declare class SettingService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        office_name: string;
        office_logo: string;
        presence_entry_start: string;
        presence_entry_end: string;
        presence_exit: string;
        presence_location_address: string;
        presence_location_latitude: number;
        presence_location_longitude: number;
        presence_meter_radius: number;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    update(uuid: string, updateSettingDto: UpdateSettingDto): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        office_name: string;
        office_logo: string;
        presence_entry_start: string;
        presence_entry_end: string;
        presence_exit: string;
        presence_location_address: string;
        presence_location_latitude: number;
        presence_location_longitude: number;
        presence_meter_radius: number;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
    updateSettingOfficeLogo(uuid: string, officeLogoName: string): Promise<void>;
    findOne(uuid: string): Promise<import("@prisma/client/runtime").GetResult<{
        uuid: string;
        office_name: string;
        office_logo: string;
        presence_entry_start: string;
        presence_entry_end: string;
        presence_exit: string;
        presence_location_address: string;
        presence_location_latitude: number;
        presence_location_longitude: number;
        presence_meter_radius: number;
        created_at: Date;
        updated_at: Date;
    }, unknown> & {}>;
}
