import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Employee } from '../entities/employee.entity';
import { EmployeeDto } from '../dto/employee.dto';
import { instanceToPlain } from 'class-transformer';
import { ICreateEmployee, IEmployee } from '../inerfacee/employee.interface';
import { QBFilterQuery } from '@mikro-orm/core';
import { UsersService } from '../../users/service/users.service';
import { mcrypto } from '../../utils';
import { randomUUID } from 'crypto';


@Injectable()
export class EmployeeService {

  async create(createEmployeeDto: ICreateEmployee, operatorId: string) {
    // 创建用户
    const user_id: string = await this.usersService.create({
      ...createEmployeeDto,
      id: randomUUID(),
      password: await new mcrypto().encrypt(createEmployeeDto.password)
    }, operatorId);
    // 创建员工
    const new_employee: Employee =  instanceToPlain(createEmployeeDto) as Employee;
    this.em.create(Employee, {
      ...new_employee,
      id: randomUUID(),
      user_id: user_id,
      created_at: new Date(),
      created_by: operatorId
    });
    this.em.flush();
    return {code: 200, id: user_id};
  }

  async findAll() {
    return await this.em.execute('select tb_employee.id as id, tb_employee.name as name,tb_department.id as department_id,tb_department.name as department_name,gender,age,position,is_leader from tb_employee,tb_department where department_id = tb_department.id');
    // await this.em.find(Employee, {});
  }

  async filter(condition: QBFilterQuery<Employee>){
    return this.em.createQueryBuilder(Employee).select('*').where(condition);
  }

  async findOne(id: string): Promise<Employee | null> {
    const employee: Employee = await this.em.findOneOrFail(Employee, {
      id: id,
    });
    return employee?employee:null;
  }

  async update(id: string, updateEmployeeDto: EmployeeDto, operatorId: string) {
    try {
      let toModifyEmployee: Employee = await this.em.findOneOrFail(Employee, {
        id: id
      })
      const mod_employee = instanceToPlain(updateEmployeeDto) as Employee;
      toModifyEmployee.updated_at = new Date();
      toModifyEmployee.updated_by = operatorId;
      toModifyEmployee.age = mod_employee.age;
      toModifyEmployee.department_id = mod_employee.department_id;
      toModifyEmployee.gender = mod_employee.gender;
      toModifyEmployee.is_leader = mod_employee.is_leader;
      toModifyEmployee.name = mod_employee.name;
      toModifyEmployee.position = mod_employee.position;
      this.em.persistAndFlush(toModifyEmployee);
      return { code: 404, id: toModifyEmployee.id };
    } catch (e) {
      return { code: 404, message: '未找到' }
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
    private em: EntityManager,
    private usersService: UsersService
  ){}
}
