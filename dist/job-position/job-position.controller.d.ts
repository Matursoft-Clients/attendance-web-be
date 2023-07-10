import { JobPositionService } from './job-position.service';
import { Response } from 'express';
import { CreateJobPositionDto, UpdateJobPositionDto } from './dto';
export declare class JobPositionController {
    private readonly jobPositionService;
    constructor(jobPositionService: JobPositionService);
    create(createJobPositionDto: CreateJobPositionDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    update(uuid: string, updateJobPositionDto: UpdateJobPositionDto, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(uuid: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
