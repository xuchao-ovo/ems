import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({tableName: 'tb_role'})
export class Role {
    @PrimaryKey()
    id!: string;
  
    @Property()
    name!: string;
  
    @Property()
    description!: string;
}
