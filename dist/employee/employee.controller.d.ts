import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto, UpdateEmployeePhotoDto } from './dto';
import { Response } from 'express';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    create(createEmployeeDto: CreateEmployeeDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    update(uuid: string, updateEmployeeDto: UpdateEmployeeDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateEmployeePhoto(uuid: string, updateEmployeePhotoDTO: UpdateEmployeePhotoDto): Promise<string>;
    remove(uuid: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
