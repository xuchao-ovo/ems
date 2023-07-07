import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Salary } from '../entities/salary.entity';
import { SalaryDto } from '../dto/salary.dto';
import { instanceToPlain} from 'class-transformer';
import { randomUUID } from 'crypto';


@Injectable()
export class SalaryService {

  async create(createSalaryDto: SalaryDto, operatorId: string) {
    let new_Salary: Salary =  instanceToPlain(createSalaryDto) as Salary;
    new_Salary = this.em.create(Salary, {
      ...new_Salary,
      id: randomUUID(),
      created_at: new Date(),
      created_by: operatorId
    })
    this.em.flush();
    return {code: 200, id: new_Salary.id};
  }

  async findAll() {
    return await this.em.execute("select tb_salary.id, tb_employee.name as name,tb_employee.id as employee_id,tb_salary.salary_month ,basic_salary, bonus, deduction, total_salary from tb_salary,tb_employee where tb_salary.employee_id = tb_employee.id;")
    // return await this.em.find(Salary, {});
  }

  async findOne(id: string){
    const salary: Salary = await this.em.findOneOrFail(Salary, {
      id: id,
    });
    return salary?salary:null;
  }

  async update(id: string, updateSalaryDto: SalaryDto, operatorId: string) {
    try {
      let toModifySalary: Salary =await this.em.findOneOrFail(Salary, {
        id: updateSalaryDto.id
      })
      const mod_salary = instanceToPlain(updateSalaryDto) as Salary;

      toModifySalary.basic_salary = mod_salary.basic_salary;
      toModifySalary.bonus = mod_salary.bonus;
      toModifySalary.deduction = mod_salary.deduction;
      toModifySalary.total_salary = mod_salary.total_salary;
      toModifySalary.salary_month = mod_salary.salary_month;
      toModifySalary.updated_at = new Date();
      toModifySalary.updated_by = operatorId;

      // await this.em.upsert(Salary, updateSalaryDto);
      this.em.persistAndFlush(toModifySalary);
      this.em.flush();
      return { code: 200, id: mod_salary.id };
    } catch (e) {
      return await {code: 404, message: '未找到'}
    }
  }

  async remove(id: string) {
    try {
      const salary: Salary =await this.em.findOneOrFail(Salary, {
        id: id
      })
      this.em.remove(salary).flush();
      return { code: 200, id: salary.id };
    } catch (e) {
      return {code: 404, message: '未找到'}
    }
  }

  constructor(
    private em: EntityManager
  ){}
}
