import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Attendance } from '../entities/attendance.entity';


@Injectable()
export class AttendanceService {

  async create() {
    return '';
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

  async update() {
    return '';
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
