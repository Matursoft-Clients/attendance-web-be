import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    update(uuid: string, updateUserDto: UpdateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
