import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity({tableName: 'tb_attendance'})
export class Attendance {
    @PrimaryKey()
    id!: string;
  
    @Property()
    empoloyee_id!: string;
  
    @Property({fieldName: 'date'})
    date_time!: Date;

    @Property()
    check_in!: Date;

    @Property()
    check_out!: Date;

    @Property()
    leave_reason!: string;

    @Property()
    created_by!: string;

    @Property()
    created_at!: Date;

    @Property({nullable: true})
    updated_by!: string | null;

    @Property({nullable: true})
    updated_at!: Date | null;

}
