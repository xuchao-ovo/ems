import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity({tableName: 'tb_employee'})
export class Employee {
    @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
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
    user_id!: string;

    @Property({nullable: true})
    created_by!: string | null;

    @Property({nullable: true})
    created_at!: Date | null;

    @Property({nullable: true})
    updated_by!: string | null;

    @Property({nullable: true})
    updated_at!: Date | null;

}
