import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { NotFoundError } from 'rxjs';


@Injectable()
export class UsersService {

  create(createUserDto: CreateUserDto) {
    this.em.create(User, {
      username: createUserDto.username,
      password: createUserDto.password,
      roleId: 0,
      isDelete: false
    });
    return this.em.flush();
  }

  findAll() {
    return this.em.find(User, {});
  }

  async findOne(username: string): Promise<User | null> {
    const user: User =await this.em.findOneOrFail(User, {
      username: username,
    });
    return user?user:null;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const toModifyUser: User =await this.em.findOneOrFail(User, {
        username: updateUserDto.username,
        password: updateUserDto.password
      })
      toModifyUser.password = updateUserDto.new_password;
      return this.em.flush();
    } catch (e) {
      return {code: 404, message: '用户未找到'}
    }
  }

  async remove(id: string) {
    try {
      const user: User =await this.em.findOneOrFail(User, {
        id: id
      })
      return this.em.remove(user).flush();
    } catch (e) {
      return {code: 404, message: '用户未找到'}
    }
  }

  constructor(
    private em: EntityManager
  ){}
}
