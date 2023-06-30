import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity({tableName: 'tb_salary'})
export class Salary {
    @PrimaryKey()
    id!: string;
  
    @Property()
    employee_id!: string;
  
    @Property()
    salary_month!: Date;

    @Property()
    base_salary!: number;

    @Property()
    bonus!: number;

    @Property()
    deduction!: number;

    @Property()
    total_salary!: number;

    @Property()
    role_id!: string;
}
