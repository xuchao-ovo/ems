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
    this.em.create(User, {
      ...newUser,
      created_at: new Date(),
      created_by: operatorId,
      updated_at: null,
      updated_by: ''
    });
    return await this.em.flush();
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

  async update(id: string, updateUserDto: UpdateUserDto, operatorId: string) {
    
    try {
      const toModifyUser: User =await this.em.findOneOrFail(User, {
        username: updateUserDto.username,
        password: updateUserDto.password
      })
      const cryptedPassword = await new mcrypto().encrypt(updateUserDto.new_password)
      toModifyUser.password = cryptedPassword;
      toModifyUser.updated_at = new Date();
      toModifyUser.updated_by = operatorId;
      return this.em.upsert(User, toModifyUser);
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
