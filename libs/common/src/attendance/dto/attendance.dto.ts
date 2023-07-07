import { Expose } from 'class-transformer';
export class AttendanceDto {
    
    @Expose()
    id!: string;
    @Expose({name: 'employee_id'})
    employeeId?: string;
    @Expose({name: 'date_time'})
    date?: Date;
    @Expose({name: 'check_in'})
    checkIn?: Date;
    @Expose({name: 'check_out'})
    checkOut?: Date;
    @Expose({name: 'leave_reason'})
    leaveReason?: string;
    @Expose({name: 'created_by'})
    createdBy?: string;
    @Expose({name: 'created_at'})
    createdAt?: Date;
    @Expose({name: 'updated_by'})
    updatedBy?: string;
    @Expose({name: 'updated_at'})
    updatedAt?: Date;

}
