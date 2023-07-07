import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Department } from '../entities/departments.entity';
import { DepartmentDto } from '../dto/department.dto';
import { instanceToPlain } from 'class-transformer';
import { IDepartments_tree, TreeNode } from '../inerfacee/departments.interface';
import { randomUUID } from 'crypto';



@Injectable()
export class DepartmentService {

  async create(createDepartmentDto: DepartmentDto, operatorId: string) {
    this.em.create(Department, {
      id: randomUUID(),
      name: createDepartmentDto.name,
      description: createDepartmentDto.description,
      parent_id: null,
      created_at: new Date(),
      created_by: operatorId
    });
    return this.em.flush();
  }

  async findAll() {
    const departments: Department[] = await this.em.find(Department, {parent_id: null});
    return departments;
  }

  arrayToTree<T extends TreeNode<string>>(array: T[], parent_id: string){
    let result: T[] = [];
    array.forEach(item => {
      if (item.parent_id == parent_id) {
        let children: T[] = this.arrayToTree(array, item.parent_id);
        if(children.length > 0){
          item.children = children;
        }
        result.push(item);
      }
    });
    return result;
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
      toModifyDepartment.description = mod_department.description;
      toModifyDepartment.name = mod_department.name;
      toModifyDepartment.updated_at = new Date();
      toModifyDepartment.updated_by = operatorId;
      await this.em.persistAndFlush(toModifyDepartment);
      return { code: 200, id: toModifyDepartment.id };
    } catch (e) {
      return { code: 404, message: '未找到' }
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
