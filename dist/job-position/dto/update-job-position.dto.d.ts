import { CreateJobPositionDto } from './create-job-position.dto';
declare const UpdateJobPositionDto_base: import("@nestjs/common").Type<Partial<CreateJobPositionDto>>;
export declare class UpdateJobPositionDto extends UpdateJobPositionDto_base {
    name?: string;
    code?: string;
}
export {};
