import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { mcrypto } from '../../utils';
import { UserDto } from '../dto/user.dto';
import { instanceToPlain } from 'class-transformer';


@Injectable()
export class UsersService {

  async create(createUserDto: UserDto, operatorId: string) {
    const newUser = instanceToPlain(createUserDto) as User;
    const user = this.em.create(User, {
      ...newUser,
      created_at: new Date(),
      created_by: operatorId
    });
    this.em.flush();
    return user.id;
  }

  async findAll()           {
    return await this.em.find(User, {});
  }

  async findOne(username: string): Promise<User | null> {
    const user: User =await this.em.findOneOrFail(User, {
      username: username,
    });
    return user?user:null;
  }

  async update(updateUserDto: UpdateUserDto, operatorId: string) {
    
    try {
      const toModifyUser: User =await this.em.findOneOrFail(User, {
        id: operatorId
      })
      if(updateUserDto.new_password != updateUserDto.re_password){
        return {code: 404, message: '信息提交错误，异常的客户端'};
      }
      const cryptedPassword = await new mcrypto().encrypt(updateUserDto.new_password)
      toModifyUser.password = cryptedPassword;
      toModifyUser.updated_at = new Date();
      toModifyUser.updated_by = operatorId;
      this.em.upsert(User, toModifyUser);
      return {code: 200, message: '密码修改完成'};
    } catch (e) {
      return {code: 404, message: '用户未找到'}
    }
  }

  async remove(id: string) {
    try {
      const user: User =await this.em.findOneOrFail(User, {
        id: id
      })
      return await this.em.remove(user).flush();
    } catch (e) {
      return { code: 404, message: '用户未找到' }
    }
  }

  constructor(
    private em: EntityManager
  ){}
}
