import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Role } from '../entities/roles.entity';
import { RoleDto } from '../dto/role.dto';
import { instanceToPlain } from 'class-transformer';
import { randomUUID } from 'crypto';


@Injectable()
export class RoleService {

  async create(createSalaryDto: RoleDto, operatorId: string) {
    const new_role: Role =  instanceToPlain(createSalaryDto) as Role;
    this.em.create(Role, {
      ...new_role,
      id: randomUUID(),
      created_at: new Date(),
      created_by: operatorId
    });
    this.em.flush();
    return { code: 200, id: new_role.id }
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
      const mod_role = instanceToPlain(updateRoleDto) as Role;
      
      toModifyRole.name = mod_role.name;
      toModifyRole.description = mod_role.description;
      toModifyRole.updated_at = new Date();
      toModifyRole.created_by = operatorId;

      this.em.persistAndFlush(toModifyRole);
      return { code: 200, id: toModifyRole.id };
    } catch (e) {
      return {code: 404, message: '未找到'}
    }
  }

  async remove(id: string) {
    const to_del_role = await this.em.findOneOrFail(Role, { id: id});
    this.em.remove(to_del_role).flush();
    return {code: 200, id: to_del_role.id };
  }

  constructor(
    private em: EntityManager
  ){}
}
