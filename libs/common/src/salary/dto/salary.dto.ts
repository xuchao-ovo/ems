import { Expose } from 'class-transformer';
export class SalaryDto {
    
    @Expose()
    id!: string;
    @Expose({name: 'employee_id'})
    employeeId?: string;
    @Expose({name: 'salary_month'})
    salaryMonth?: Date;
    @Expose({name: 'basic_salary'})
    basicSalary?: number;
    @Expose()
    bonus?: number;
    @Expose()
    deduction?: number;
    @Expose({name: 'total_salary'})
    totalSalary?: number;
    @Expose({name: 'created_by'})
    createdBy?: string;
    @Expose({name: 'created_at'})
    createdAt?: Date;
    @Expose({name: 'updated_by'})
    updatedBy?: string;
    @Expose({name: 'updated_at'})
    updatedAt?: Date;

}
