import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({tableName: 'tb_department'})
export class Department {
    @PrimaryKey()
    id?: string;
  
    @Property()
    name?: string;
  
    @Property()
    description?: string;

    @Property()
    parent_id?: string;

    @Property()
    created_by?: string;

    @Property()
    created_at?: Date;

    @Property({nullable: true})
    updated_by?: string | null;

    @Property({nullable: true})
    updated_at?: Date | null;

}
