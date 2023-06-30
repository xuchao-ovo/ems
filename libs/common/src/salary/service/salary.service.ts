import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Salary } from '../entities/salary.entity';


@Injectable()
export class SalaryService {

  create() {
    return '';
  }

  findAll() {
    return '';
  }

  async findOne(id: string){
    const salary: Salary = await this.em.findOneOrFail(Salary, {
      id: id,
    });
    return salary?salary:null;
  }

  async update() {
    return '';
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
