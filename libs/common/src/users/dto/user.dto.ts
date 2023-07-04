import { Exclude, Expose } from 'class-transformer';
export class UserDto {
    
    @Expose()
    id?: string;
    @Expose()
    username?: string;
    // @Expose()
    @Exclude({ toPlainOnly: true })
    password?: string;
    @Expose({name: 'created_by'})
    createdBy?: string;
    @Expose({name: 'created_at'})
    createdAt?: Date;
    @Expose({name: 'updated_by'})
    updatedBy?: string;
    @Expose({name: 'updated_at'})
    updatedAt?: Date;

}
