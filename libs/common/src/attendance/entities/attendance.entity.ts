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
    overtime_status!: boolean;
}
