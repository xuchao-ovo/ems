import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Employee } from '../entities/employee.entity';
import { EmployeeDto } from '../dto/employee.dto';
import { instanceToPlain } from 'class-transformer';


@Injectable()
export class EmployeeService {

  async create(createEmployeeDto: EmployeeDto, operatorId: string) {
    const new_employee: Employee =  instanceToPlain(createEmployeeDto) as Employee;
    return this.em.create(Employee, {
      ...new_employee,
      created_at: new Date(),
      created_by: operatorId,
      updated_at: null,
      updated_by: ''
    });
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

  async update(id: string, updateEmployeeDto: EmployeeDto, operatorId: string) {
    try {
      let toModifyEmployee: Employee =await this.em.findOneOrFail(Employee, {
        id: updateEmployeeDto.id
      })
      const mod_salary = instanceToPlain(updateEmployeeDto) as Employee;
      toModifyEmployee = {
        ...mod_salary,
        updated_at: new Date(),
        updated_by: operatorId
      }
      return await this.em.upsert(Employee, updateEmployeeDto);
    } catch (e) {
      return await {code: 404, message: '未找到'}
    }
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
