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
    basic_salary!: number;

    @Property()
    bonus!: number;

    @Property()
    deduction!: number;

    @Property()
    total_salary!: number;

    @Property()
    created_by!: string;

    @Property()
    created_at!: Date;

    @Property({nullable: true})
    updated_by!: string | null;

    @Property({nullable: true})
    updated_at!: Date | null;

}
