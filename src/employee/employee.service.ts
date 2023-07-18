import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { FILE_URL } from 'src/config';
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

    // Cek Branch is valid or not
    const branch = await this.findBranchByUuid(createEmployeeDto.branch_uuid);

    if (!branch) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Employee failed to create! Branch not found.',
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
          nik: createEmployeeDto.nik,
          name: createEmployeeDto.name,
          branch_uuid: createEmployeeDto.branch_uuid,
          job_position_uuid: createEmployeeDto.job_position_uuid,
          email: createEmployeeDto.email,
          whatsapp_number: createEmployeeDto.whatsapp_number,
          password: await bcrypt.hash(createEmployeeDto.password, 10),
          photo: photoFileName,
          created_at: new Date(),
          updated_at: new Date()
        }
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
      delete e.password
      delete e.token
      e.photo ? e.photo = FILE_URL + 'employee/' + e.photo : null
    })

    let extendedEmployees = []
    for (let i = 0; i < employees.length; i++) {
      extendedEmployees[i] = employees[i];
      delete extendedEmployees[i].password;
      delete extendedEmployees[i].token;
      extendedEmployees[i].photo ? (extendedEmployees[i].photo = FILE_URL + 'employee/' + extendedEmployees[i].photo) : null;
      extendedEmployees[i].branch = await this.findBranchByUuid(extendedEmployees[i].branch_uuid);
      extendedEmployees[i].job_position = await this.findJobPositionByUuid(extendedEmployees[i].job_position_uuid);
    }

    return extendedEmployees
  }

  async findOne(uuid: string) {
    return await this.prisma.eMPLOYEES.findUnique({ where: { uuid } })
  }

  async findEmployeeByEmail(email: string) {
    return await this.prisma.eMPLOYEES.findUnique({ where: { email } })
  }

  async findBranchByUuid(uuid: string) {
    return await this.prisma.bRANCHES.findUnique({ where: { uuid } })
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

    // Cek Branch is valid or not
    const branch = await this.findBranchByUuid(updateEmployeeDto.branch_uuid);

    if (!branch) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Employee failed to create! Branch not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
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
          nik: updateEmployeeDto.nik,
          name: updateEmployeeDto.name,
          branch_uuid: updateEmployeeDto.branch_uuid,
          job_position_uuid: updateEmployeeDto.job_position_uuid,
          email: updateEmployeeDto.email,
          whatsapp_number: updateEmployeeDto.whatsapp_number,
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

    try {
      return await this.prisma.eMPLOYEES.delete({ where: { uuid } })

    } catch (error) {
      console.log(error)
    }
  }
}