import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity({tableName: 'tb_employee'})
export class Employee {
    @PrimaryKey()
    id!: string;
  
    @Property()
    name!: string;
  
    @Property()
    gender!: string;

    @Property()
    age!: number;

    @Property()
    position!: string;

    @Property()
    department_id!: string;

    @Property()
    is_leader!: boolean;

    @Property()
    role_id!: string;
}
