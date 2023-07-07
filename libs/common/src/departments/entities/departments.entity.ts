import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({tableName: 'tb_department'})
export class Department {
    @PrimaryKey()
    id?: string;
  
    @Property()
    name?: string;
  
    @Property()
    description?: string;

    @Property({nullable: true})
    parent_id?: string | null;
    @Property()
    created_by?: string;

    @Property()
    created_at?: Date;

    @Property({nullable: true})
    updated_by?: string | null;

    @Property({nullable: true})
    updated_at?: Date | null;

}
