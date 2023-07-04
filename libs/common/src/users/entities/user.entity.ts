import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
// const uuid = require('uuid')
@Entity({tableName: 'tb_user'})
export class User {
    @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    id!: string;
  
    @Property()
    username!: string;
  
    @Property()
    password!: string;
    
    @Property({nullable: true})

    created_by!: string | null;

    @Property({nullable: true})

    created_at!: Date | null;

    @Property({nullable: true})
    updated_by!: string | null;

    @Property({nullable: true})
    updated_at!: Date | null;

}
