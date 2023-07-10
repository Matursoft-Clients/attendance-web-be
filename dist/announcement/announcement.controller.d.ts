import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto';
import { Response } from 'express';
export declare class AnnouncementController {
    private readonly announcementService;
    constructor(announcementService: AnnouncementService);
    create(createAnnouncementDto: CreateAnnouncementDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(uuid: string, res: Response): Promise<Response<any, Record<string, any>>>;
    update(uuid: string, updateAnnouncementDto: UpdateAnnouncementDto, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(uuid: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
