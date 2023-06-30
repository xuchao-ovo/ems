import { Entity, PrimaryKey } from "@mikro-orm/core";

@Entity({tableName: 'tb_user_roles'})
export class User_role {
    @PrimaryKey()
    user_id!: string;
  
    @PrimaryKey()
    role_id!: string;
}
