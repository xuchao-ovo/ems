import { Expose } from 'class-transformer';
export class EmployeeDto {
    
    @Expose()
    id!: string;
    @Expose()
    name?: string;
    @Expose()
    gender?: string;
    @Expose()
    age?: number;
    @Expose()
    position?: string;
    @Expose({name: 'department_id'})
    departmentId?: string;
    @Expose({name: 'is_leader'})
    isLeader?: boolean;
    @Expose({name: 'user_id'})
    userId?: string;
    @Expose({name: 'created_by'})
    createdBy?: string;
    @Expose({name: 'created_at'})
    createdAt?: Date;
    @Expose({name: 'updated_by'})
    updatedBy?: string;
    @Expose({name: 'updated_at'})
    updatedAt?: Date;
    

}
