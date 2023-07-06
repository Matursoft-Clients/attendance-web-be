import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobPositionDto, UpdateJobPositionDto } from './dto';

@Injectable()
export class JobPositionService {

  constructor(private prisma: PrismaService) { }

  async create(createJobPositionDto: CreateJobPositionDto) {
    try {
      const createJobPosition = await this.prisma.jOB_POSITIONS.create({
        data: {
          uuid: uuidv4(),
          name: createJobPositionDto.name,
          code: randomstring.generate(10),
          created_at: new Date(),
          updated_at: new Date()
        },
      });

      return createJobPosition;
    } catch (error) {
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
    return await this.prisma.jOB_POSITIONS.findMany()
  }

  async findOne(uuid: string) {
    return await this.prisma.jOB_POSITIONS.findUnique({ where: { uuid } })
  }

  async update(uuid: string, updateJobPositionDto: UpdateJobPositionDto) {

    const jobPosition = await this.findOne(uuid);

    if (!jobPosition) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Job Position failed to update!',
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

    return await this.prisma.jOB_POSITIONS.delete({
      where: { uuid }
    })
  }

}
