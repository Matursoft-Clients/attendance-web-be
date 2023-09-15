import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomAttendanceLocationDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomAttendanceLocationService {

  constructor(private prisma: PrismaService) { }

  async create(createCustomAttendanceLocationDto: CreateCustomAttendanceLocationDto) {

    createCustomAttendanceLocationDto.employee_uuid.forEach(async (employeeUuid) => {
        const employee = await this.findEmployeeByUuid(employeeUuid);

        if (!employee) {
            throw new HttpException(
              {
                code: HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Custom attendance location failed to create! No Employee found.',
              },
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
          }

          try {
            const createCustomAttendanceLocation = await this.prisma.cUSTOM_ATTENDANCE_LOCATIONS.create({
              data: {
                uuid: uuidv4(),
                employee_uuid: employeeUuid,
                start_date: new Date(createCustomAttendanceLocationDto.start_date),
                end_date: new Date(createCustomAttendanceLocationDto.end_date),
                presence_location_address: createCustomAttendanceLocationDto.presence_location_address,
                presence_location_latitude: +createCustomAttendanceLocationDto.presence_location_latitude,
                presence_location_longitude: +createCustomAttendanceLocationDto.presence_location_longitude,
                created_at: new Date(),
                updated_at: new Date()
              },
            });
      
            return createCustomAttendanceLocation;
      
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
    })
  }

  async findAll() {
    let customAttendanceLocationsExtendEmployee = [];
    const customAttendanceLocations = await this.prisma.cUSTOM_ATTENDANCE_LOCATIONS.findMany()

    for (let i = 0; i < customAttendanceLocations.length; i++) {
      customAttendanceLocationsExtendEmployee[i] = customAttendanceLocations[i];
      customAttendanceLocationsExtendEmployee[i].employee = await this.findEmployeeByUuid(customAttendanceLocations[i].employee_uuid)

      delete customAttendanceLocationsExtendEmployee[i].employee['password'];

    }

    return customAttendanceLocationsExtendEmployee
  }

  async findOne(uuid: string) {
    return await this.prisma.cUSTOM_ATTENDANCE_LOCATIONS.findFirst({ where: { uuid } })
  }

  async findEmployeeByUuid(uuid: string) {
    return await this.prisma.eMPLOYEES.findFirst({ where: { uuid } })
  }

  async remove(uuid: string) {

    const customAttendanceLocation = await this.findOne(uuid);

    if (!customAttendanceLocation) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Custom attendance location failed to delete! Record not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prisma.cUSTOM_ATTENDANCE_LOCATIONS.delete({
      where: { uuid }
    })
  }
}