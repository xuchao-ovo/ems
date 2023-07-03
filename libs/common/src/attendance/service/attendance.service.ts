import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Attendance } from '../entities/attendance.entity';
import { AttendanceDto } from '../dto/attendance.dto';
import { instanceToPlain } from 'class-transformer';


@Injectable()
export class AttendanceService {

  async create(createAttendanceDto: AttendanceDto, operatorId: string) {
    const new_attendance: Attendance =  instanceToPlain(createAttendanceDto) as Attendance;
    return this.em.create(Attendance, {
      ...new_attendance,
      created_at: new Date(),
      created_by: operatorId,
      updated_at: null,
      updated_by: ''
    });
  }

  async findAll() {
    return await this.em.find(Attendance, {});
  }

  async findOne(id: string): Promise<Attendance | null> {
    const attendance: Attendance = await this.em.findOneOrFail(Attendance, {
      id: id,
    });
    return attendance?attendance:null;
  }

  async update(id: string, updateAttendanceDto: AttendanceDto, operatorId: string) {
    try {
      let toModifySalary: Attendance =await this.em.findOneOrFail(Attendance, {
        id: updateAttendanceDto.id
      })
      const mod_attendance = instanceToPlain(updateAttendanceDto) as Attendance;
      toModifySalary = {
        ...mod_attendance,
        updated_at: new Date(),
        updated_by: operatorId
      }
      return await this.em.upsert(Attendance, updateAttendanceDto);
    } catch (e) {
      return await {code: 404, message: '未找到'}
    }
  }

  async remove(id: string) {
    try {
      const attendance: Attendance =await this.em.findOneOrFail(Attendance, {
        id: id
      })
      return this.em.remove(attendance).flush();
    } catch (e) {
      return {code: 404, message: '未找到'}
    }
  }

  constructor(
    private em: EntityManager
  ){}
}
