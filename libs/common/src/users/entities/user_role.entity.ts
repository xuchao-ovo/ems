import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({tableName: 'tb_user_roles'})
export class User_role {
    @PrimaryKey()
    user_id!: string;
  
    @PrimaryKey()
    role_id!: string;

    @Property()
    created_by!: string;

    @Property()
    created_at!: Date;

    @Property({nullable: true})
    updated_by!: string | null;

    @Property({nullable: true})
    updated_at!: Date | null;

}
