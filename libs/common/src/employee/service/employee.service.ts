import { Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/postgresql";
import { Employee } from "../entities/employee.entity";
import { EmployeeDto } from "../dto/employee.dto";
import { instanceToPlain } from "class-transformer";
import { ICreateEmployee, IEmployee } from "../inerfacee/employee.interface";
import { QBFilterQuery } from "@mikro-orm/core";
import { UsersService } from "../../users/service/users.service";
import { mcrypto } from "../../utils";
import { randomUUID } from "crypto";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class EmployeeService {
  async create(createEmployeeDto: ICreateEmployee, operatorId: string) {
    // 创建用户
    const user_id: string = await this.usersService.create(
      {
        ...createEmployeeDto,
        id: randomUUID(),
        password: await new mcrypto().encrypt(createEmployeeDto.password),
      },
      operatorId
    );
    // 创建员工
    const new_employee: Employee = instanceToPlain(
      createEmployeeDto
    ) as Employee;
    this.em.create(Employee, {
      ...new_employee,
      id: randomUUID(),
      user_id: user_id,
      created_at: new Date(),
      created_by: operatorId,
    });
    this.em.flush();
    return { code: 200, id: user_id };
  }

  async findAll(
    name: string,
    position: string,
    gender: string,
    isLeader: boolean
  ) {
    const result = await this.em.execute(
      `select d.id   as id,
              e.name as name,
              d.id   as department_id,
              d.name as department_name,
              gender,
              age,
              position,
              is_leader
       from tb_employee e
                left join tb_department d on e.department_id = d.id
       where true
         and (?::text is null or (? = e.name))
         and (?::text is null or (? = e.position))
         and (?::text is null or (? = e.gender))
         and (?::text is null or (? = e.is_leader))
      `,
      [name, name, position, position, gender, gender, isLeader, isLeader]
    );
    return result;
    // await this.em.find(Employee, {});
  }

  async filter(condition: QBFilterQuery<Employee>) {
    return this.em.createQueryBuilder(Employee).select("*").where(condition);
  }

  async findOne(id: string): Promise<Employee | null> {
    const employee: Employee = await this.em.findOneOrFail(Employee, {
      id: id,
    });
    return employee ? employee : null;
  }

  async update(id: string, updateEmployeeDto: EmployeeDto, operatorId: string) {
    try {
      let toModifyEmployee: Employee = await this.em.findOneOrFail(Employee, {
        id: id,
      });
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
      return { code: 404, message: "未找到" };
    }
  }

  async remove(id: string) {
    // 删除员工时将与之联系的账号也一并删除
    try {
      const employee: Employee = await this.em.findOneOrFail(Employee, {
        id: id,
      });
      const employee_user = await this.em.findOneOrFail(User, {
        id: employee.user_id,
      });
      await this.em.remove(employee).flush();
      await this.em.remove(employee_user).flush();
      return { code: 200, id: employee_user.id };
    } catch (e) {
      return { code: 404, message: "未找到" };
    }
  }

  constructor(private em: EntityManager, private usersService: UsersService) {}
}
