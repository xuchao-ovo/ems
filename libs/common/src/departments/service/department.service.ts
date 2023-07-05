import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Department } from '../entities/departments.entity';
import { DepartmentDto } from '../dto/department.dto';
import { instanceToPlain } from 'class-transformer';



@Injectable()
export class DepartmentService {

  async create(createDepartmentDto: DepartmentDto, operatorId: string) {
    this.em.create(Department, {
      name: createDepartmentDto.name,
      description: createDepartmentDto.description,
      parent_id: createDepartmentDto.parentId,
      created_at: new Date(),
      created_by: '',
      updated_at: null,
      updated_by: ''
    });
    return this.em.flush();
  }

  async findAll() {
    return await this.em.find(Department, {});
  }

  async findOne(id: string): Promise<Department | null>{
    return await this.em.findOneOrFail(Department, {
      id: id,
    });
  }

  async update(id: string, updateDepartmentDto: DepartmentDto, operatorId: string) {
    try {
      let toModifyDepartment: Department =await this.em.findOneOrFail(Department, {
        id: updateDepartmentDto.id
      })
      const mod_department = instanceToPlain(updateDepartmentDto) as Department;
      toModifyDepartment = {
        ...mod_department,
        updated_at: new Date(),
        updated_by: operatorId
      }
      return await this.em.upsert(Department, updateDepartmentDto);
    } catch (e) {
      return await {code: 404, message: '未找到'}
    }
  }

  async remove(id: string) {
    try {
      const department: Department =await this.em.findOneOrFail(Department, {
        id: id
      })
      return this.em.remove(department).flush();
    } catch (e) {
      return {code: 404, message: '未找到'}
    }
  }

  constructor(
    private em: EntityManager
  ){}
}
