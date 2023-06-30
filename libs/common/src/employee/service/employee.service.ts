import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Employee } from '../entities/employee.entity';


@Injectable()
export class EmployeeService {

  create() {
    return '';
  }

  async findAll() {
    return await this.em.find(Employee, {});
  }

  async findOne(id: string): Promise<Employee | null> {
    const employee: Employee = await this.em.findOneOrFail(Employee, {
      id: id,
    });
    return employee?employee:null;
  }

  async update() {
    return '';
  }

  async remove(id: string) {
    try {
      const employ: Employee =await this.em.findOneOrFail(Employee, {
        id: id
      })
      return this.em.remove(employ).flush();
    } catch (e) {
      return {code: 404, message: '未找到'}
    }
  }

  constructor(
    private em: EntityManager
  ){}
}
