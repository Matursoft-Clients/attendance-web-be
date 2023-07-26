import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobPositionDto, UpdateJobPositionDto } from './dto';

@Injectable()
export class JobPositionService {

  constructor(private prisma: PrismaService) { }

  async create(createJobPositionDto: CreateJobPositionDto) {
    // Cek duplicate Code
    const job_position_code = await this.findJobPositionByCode(createJobPositionDto.code);
    console.log(job_position_code)

    if (job_position_code) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Job Position failed to create! Job Position Code already in use.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      const createJobPosition = await this.prisma.jOB_POSITIONS.create({
        data: {
          uuid: uuidv4(),
          name: createJobPositionDto.name,
          code: createJobPositionDto.code,
          created_at: new Date(),
          updated_at: new Date()
        },
      });

      return createJobPosition;
    } catch (error) {

      console.log(error)
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: "Error! Please Contact Admin.",
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async findAll() {
    return await this.prisma.jOB_POSITIONS.findMany({ orderBy: [{ name: 'asc' }] })
  }

  async findOne(uuid: string) {
    return await this.prisma.jOB_POSITIONS.findUnique({ where: { uuid } })
  }

  async findJobPositionByCode(code: string) {
    return await this.prisma.jOB_POSITIONS.findUnique({ where: { code } })
  }

  async findJobPositionInEmployee(job_position_uuid: string) {
    return await this.prisma.eMPLOYEES.findFirst({ where: { job_position_uuid } })
  }

  async update(uuid: string, updateJobPositionDto: UpdateJobPositionDto) {

    const jobPositionInUpdate = await this.findOne(uuid);

    if (!jobPositionInUpdate) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Job Position failed to update! Record not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // Cek duplicate Code
    const job_position_code = await this.findJobPositionByCode(updateJobPositionDto.code);

    if (updateJobPositionDto.code == job_position_code.code && jobPositionInUpdate.code !== updateJobPositionDto.code) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Job Position failed to create! Job Position Code already in use.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prisma.jOB_POSITIONS.update({
      where: {
        uuid
      },
      data: {
        name: updateJobPositionDto.name,
        code: updateJobPositionDto.code,
        updated_at: new Date()
      }
    })
  }

  async remove(uuid: string) {

    const jobPosition = await this.findOne(uuid);

    if (!jobPosition) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Job Position failed to delete! Record not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const jobPositionInEmployee = await this.findJobPositionInEmployee(uuid)

    if (jobPositionInEmployee) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Job Position failed to delete! Record use in Employee.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prisma.jOB_POSITIONS.delete({
      where: { uuid }
    })
  }
}
