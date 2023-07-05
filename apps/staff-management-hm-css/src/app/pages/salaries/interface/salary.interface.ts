export interface ISalary { 
    id: string; 
    employee_id: string; 
    salary_month: Date; 
    base_salary: number; 
    bonus: number; 
    deduction: number; 
    total_salary: number; 
}