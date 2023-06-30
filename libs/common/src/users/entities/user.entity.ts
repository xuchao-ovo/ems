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
    roleId!: number;

    @Property({fieldName: 'is_delete', nullable: true})
    isDelete!: boolean;
}
