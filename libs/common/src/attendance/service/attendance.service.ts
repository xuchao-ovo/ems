import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Attendance } from '../entities/attendance.entity';
import { AttendanceDto } from '../dto/attendance.dto';
import { instanceToPlain } from 'class-transformer';
import { randomUUID } from 'crypto';


@Injectable()
export class AttendanceService {

  async create(createAttendanceDto: AttendanceDto, operatorId: string) {
    const new_attendance: Attendance =  instanceToPlain(createAttendanceDto) as Attendance;
    const attendance2 = this.em.create(Attendance, {
      ...new_attendance,
      id: randomUUID(),
      employee_id: new_attendance.employee_id,
      created_at: new Date(),
      created_by: operatorId
    });
    this.em.flush();
    return {code: 200, id: attendance2.id}
  }

  async findAll() {
    return await this.em.execute("select tb_attendance.id as id,tb_employee.name as name,date as date_time,to_char(check_in, 'YYYY-MM-DD HH24:MI:SS') as check_in,to_char(check_out, 'YYYY-MM-DD HH24:MI:SS') as check_out,leave_reason from tb_attendance, tb_employee where tb_attendance.employee_id = tb_employee.id")
    // return await this.em.find(Attendance, {});
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
      });
      this.em.remove(attendance).flush()
      return {code: 200, id: attendance.id};
    } catch (e) {
      return {code: 404, message: '未找到'}
    }
  }

  constructor(
    private em: EntityManager
  ){}
}
