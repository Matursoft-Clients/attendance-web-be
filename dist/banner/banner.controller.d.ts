import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto';
import { Response } from 'express';
export declare class BannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    create(createBannerDto: CreateBannerDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    remove(uuid: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
