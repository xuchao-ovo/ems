import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Department } from '../entities/departments.entity';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';



@Injectable()
export class DepartmentService {

  create(createDepartmentDto: CreateDepartmentDto) {
    this.em.create(Department, {
      name: createDepartmentDto.name,
      description: createDepartmentDto.description,
      parent_id: createDepartmentDto.parent_id
    });
    return this.em.flush();
  }

  async findAll() {
    return await this.em.find(Department, {});
  }

  async findOne(id: string): Promise<Department | null>{
    const department: Department =await this.em.findOneOrFail(Department, {
      id: id,
    });
    return department?department:null;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      const department: Department =await this.em.findOneOrFail(Department, {
        id: updateDepartmentDto.id
      })
      department.name = updateDepartmentDto.new_name;
      return this.em.flush();
    } catch (e) {
      return {code: 404, message: '部门未找到'}
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
