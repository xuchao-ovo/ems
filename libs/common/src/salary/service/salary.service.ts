import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Salary } from '../entities/salary.entity';
import { SalaryDto } from '../dto/salary.dto';
import { instanceToPlain} from 'class-transformer';


@Injectable()
export class SalaryService {

  async create(createSalaryDto: SalaryDto, operatorId: string) {
    const new_Salary: Salary =  instanceToPlain(createSalaryDto) as Salary;
    return this.em.create(Salary, {
      ...new_Salary,
      created_at: new Date(),
      created_by: operatorId,
      updated_at: null,
      updated_by: ''
    });
  }

  async findAll() {
    return await this.em.find(Salary, {});
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
      toModifySalary = {
        ...mod_salary,
        updated_at: new Date(),
        updated_by: operatorId
      }
      return await this.em.upsert(Salary, updateSalaryDto);
    } catch (e) {
      return await {code: 404, message: '未找到'}
    }
  }

  async remove(id: string) {
    try {
      const salary: Salary =await this.em.findOneOrFail(Salary, {
        id: id
      })
      return this.em.remove(salary).flush();
    } catch (e) {
      return {code: 404, message: '未找到'}
    }
  }

  constructor(
    private em: EntityManager
  ){}
}
