import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Role } from '../entities/roles.entity';
import { RoleDto } from '../dto/role.dto';
import { instanceToPlain } from 'class-transformer';


@Injectable()
export class RoleService {

  async create(createSalaryDto: RoleDto, operatorId: string) {
    const new_role: Role =  instanceToPlain(createSalaryDto) as Role;
    return this.em.create(Role, {
      ...new_role,
      created_at: new Date(),
      created_by: operatorId,
      updated_at: null,
      updated_by: ''
    });
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

  async update(id: string, updateRoleDto: RoleDto, operatorId: string) {
    try {
      let toModifyRole: Role =await this.em.findOneOrFail(Role, {
        id: updateRoleDto.id
      })
      const mod_salary = instanceToPlain(updateRoleDto) as Role;
      toModifyRole = {
        ...mod_salary,
        updated_at: new Date(),
        updated_by: operatorId
      }
      return await this.em.upsert(Role, updateRoleDto);
    } catch (e) {
      return await {code: 404, message: '未找到'}
    }
  }

  async remove(id: string) {
    return id;
  }

  constructor(
    private em: EntityManager
  ){}
}
