import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({tableName: 'tb_user'})
export class User {
    @PrimaryKey()
    id!: string;
  
    @Property()
    username!: string;
  
    @Property()
    password!: string;

    @Property({fieldName: 'role_id', nullable: true})
    roleId!: string;

    @Property({fieldName: 'employee_id', nullable: true})
    employeeId!: string;

    @Property()
    created_by!: string;

    @Property()
    created_at!: Date;

    @Property({nullable: true})
    updated_by!: string | null;

    @Property({nullable: true})
    updated_at!: Date | null;

}
