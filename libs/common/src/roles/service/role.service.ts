import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Role } from '../entities/roles.entity';


@Injectable()
export class RoleService {

  create() {
    return '';
  }

  async findAll() {
    return await this.em.find(Role, {});
  }

  async findOne(id: string){
    const role: Role = await this.em.findOneOrFail(Role, {
      id: id,
    });
    return role?role:null;
  }

  async update() {
    return '';
  }

  async remove(id: string) {
    return id;
  }

  constructor(
    private em: EntityManager
  ){}
}
