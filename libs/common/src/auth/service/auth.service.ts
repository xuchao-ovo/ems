import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';
import { Employee, RegisterDto, User, mcrypto } from 'common';
import { EntityManager } from '@mikro-orm/core';
@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      private _em: EntityManager
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        // 将密码加密，与数据库密码进行比对
        const cryptedPass =  new mcrypto().digest(pass);
        if (user?.password !== await cryptedPass) {
          throw new UnauthorizedException();
        } 
        // 生成payload
        const payload = { sub: user?.id, username: user?.username};
        
        // 返回token
        return {
          id: user?.id,
          access_token: await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
            expiresIn: 1000*60
          }),
        };
      }
    
      async register(registerDto: RegisterDto){
        const em = this._em.fork();
        await em.begin();
        try{
          // 创建Employee
          const newEmployee = new Employee();
          newEmployee.name = registerDto.name;
          newEmployee.age = registerDto.age;
          newEmployee.gender = registerDto.gender;
          newEmployee.department_id = registerDto.department_id;
          newEmployee.position = registerDto.position;
          newEmployee.role_id = registerDto.role_id;
          newEmployee.is_leader = registerDto.is_leader
          em.commit()
          // 创建User
          const newUser = new User();
          newUser.username = registerDto.username;
          newUser.password = await new mcrypto().digest(registerDto.password);
          newUser.roleId = registerDto.role_id;
          newUser.employeeId = newEmployee.id;
          em.commit()
        }catch (e) {
          await em.rollback();
          return {code: 500, message: '账户注册错误，请联系管理员。'}
        }
        return null
      }
}
