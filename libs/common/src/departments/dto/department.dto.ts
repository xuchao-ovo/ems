import { Expose } from 'class-transformer';
export class DepartmentDto {
    
    @Expose()
    id!: string;
    @Expose()
    name?: string;
    @Expose()
    description?: string;
    @Expose({name: 'parent_id'})
    parentId?: string;
    @Expose({name: 'created_by'})
    createdBy?: string;
    @Expose({name: 'created_at'})
    createdAt?: Date;
    @Expose({name: 'updated_by'})
    updatedBy?: string;
    @Expose({name: 'updated_at'})
    updatedAt?: Date;

}
