import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBranchDto, UpdateBranchDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BranchService {

  constructor(private prisma: PrismaService) { }

  async create(createBranchDto: CreateBranchDto) {
    try {
      const createBranch = await this.prisma.bRANCHES.create({
        data: {
          uuid: uuidv4(),
          name: createBranchDto.name,
          code: createBranchDto.code,
          presence_location_address: createBranchDto.presence_location_address,
          presence_location_latitude: +createBranchDto.presence_location_latitude,
          presence_location_longitude: +createBranchDto.presence_location_longitude,
          created_at: new Date(),
          updated_at: new Date()
        },
      });

      return createBranch;
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
    return await this.prisma.bRANCHES.findMany({ orderBy: [{ name: 'asc' }] })
  }

  async findOne(uuid: string) {
    return await this.prisma.bRANCHES.findUnique({ where: { uuid } })
  }

  async findBranchInEmployee(branch_uuid: string) {
    return await this.prisma.eMPLOYEES.findFirst({ where: { branch_uuid } })
  }

  async update(uuid: string, updateBranchDto: UpdateBranchDto) {
    const branch = await this.findOne(uuid);

    if (!branch) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Branch failed to update! Record not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prisma.bRANCHES.update({
      where: { uuid },
      data: {
        name: updateBranchDto.name,
        code: updateBranchDto.code,
        presence_location_address: updateBranchDto.presence_location_address,
        presence_location_latitude: +updateBranchDto.presence_location_latitude,
        presence_location_longitude: +updateBranchDto.presence_location_longitude,
        updated_at: new Date()
      }
    })
  }

  async remove(uuid: string) {
    const branch = await this.findOne(uuid);

    if (!branch) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Branch failed to delete! Record not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const branchInEmployee = await this.findBranchInEmployee(uuid)

    if (branchInEmployee) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Branch failed to delete! Record use in Employee.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prisma.bRANCHES.delete({
      where: { uuid }
    })
  }
}
