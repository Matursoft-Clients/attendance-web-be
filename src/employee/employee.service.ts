import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { WEB_URL } from 'src/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {

  constructor(private prisma: PrismaService) { }

  async create(createEmployeeDto: CreateEmployeeDto, photoFileName: string) {

    // Cek duplicate Email
    const employee = await this.findEmployeeByEmail(createEmployeeDto.email);


    if (employee) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Employee failed to create! Email already in use.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // Cek Job Position is valid or not
    const jobPosition = await this.findJobPositionByUuid(createEmployeeDto.job_position_uuid);


    if (!jobPosition) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Employee failed to create! Job Position not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      const createEmployee = await this.prisma.eMPLOYEES.create({
        data: {
          uuid: uuidv4(),
          name: createEmployeeDto.name,
          job_position_uuid: createEmployeeDto.job_position_uuid,
          email: createEmployeeDto.email,
          password: await bcrypt.hash(createEmployeeDto.password, 10),
          photo: photoFileName,
          created_at: new Date(),
          updated_at: new Date()
        },
      });

      return createEmployee;
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
    const employees = await this.prisma.eMPLOYEES.findMany()

    employees.map((e) => {
      console.log(e)
      e.photo ? e.photo = WEB_URL + 'employee/' + e.photo : null
    })

    return employees
  }

  async findOne(uuid: string) {
    return await this.prisma.eMPLOYEES.findUnique({ where: { uuid } })
  }

  async findEmployeeByEmail(email: string) {
    return await this.prisma.eMPLOYEES.findUnique({ where: { email } })
  }

  async findJobPositionByUuid(uuid: string) {
    return await this.prisma.jOB_POSITIONS.findUnique({ where: { uuid } })
  }

  async update(uuid: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeInUpdate = await this.findOne(uuid);

    if (!employeeInUpdate) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Employee failed to update! Record not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (updateEmployeeDto.password) {
      if (!('password_confirmation' in updateEmployeeDto)) {
        throw new HttpException(
          {
            code: HttpStatus.UNPROCESSABLE_ENTITY,
            msg: 'Password confirmation is required.',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    // Cek duplicate Email
    const employee = await this.findEmployeeByEmail(updateEmployeeDto.email);

    if (employee) {
      if (updateEmployeeDto.email == employee.email && employeeInUpdate.email !== updateEmployeeDto.email) {
        throw new HttpException(
          {
            code: HttpStatus.UNPROCESSABLE_ENTITY,
            msg: 'Employee failed to update! Email already in use.',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }


    // Cek Job Position is valid or not
    const jobPosition = await this.findJobPositionByUuid(updateEmployeeDto.job_position_uuid);

    if (!jobPosition) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Employee failed to update! Job Position not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      const updateEmployee = await this.prisma.eMPLOYEES.update({
        where: { uuid },
        data: {
          name: updateEmployeeDto.name,
          job_position_uuid: updateEmployeeDto.job_position_uuid,
          email: updateEmployeeDto.email,
          password: updateEmployeeDto.password ? await bcrypt.hash(updateEmployeeDto.password, 10) : employeeInUpdate.password,
          updated_at: new Date()
        },
      });

      return updateEmployee;
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

  async updateEmployeePhoto(uuid: string, photoFileName: string) {
    try {
      await this.prisma.eMPLOYEES.update({
        where: { uuid },
        data: {
          photo: photoFileName,
        },
      });
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

  async remove(uuid: string) {
    const employee = await this.findOne(uuid);

    if (!employee) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Employee failed to delete! Record not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prisma.eMPLOYEES.delete({ where: { uuid } })
  }
}