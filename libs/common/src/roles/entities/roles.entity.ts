import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({tableName: 'tb_role'})
export class Role {
    @PrimaryKey()
    id!: string;
  
    @Property()
    name!: string;
  
    @Property()
    description!: string;

    @Property()
    created_by!: string;

    @Property()
    created_at!: Date;

    @Property({nullable: true})
    updated_by!: string | null;

    @Property({nullable: true})
    updated_at!: Date | null;

}
