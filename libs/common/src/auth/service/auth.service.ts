import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';
import { RegisterDto } from '../dto/register.dto';
import { mcrypto } from '../../utils';
import { EntityManager } from '@mikro-orm/postgresql';
import { EmployeeService } from '../../employee/service/employee.service';
import { Department, Employee, User, UserDto } from 'common';
import { instanceToPlain } from 'class-transformer';
const uuid = require('uuid');
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private em: EntityManager,
  ) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    // 将密码加密，与数据库密码进行比对
    const cryptedPass:string = await new mcrypto().encrypt(pass);
    if (user?.password !== cryptedPass) {
      throw new UnauthorizedException();
    }
    // TODO: Generate a JWT and return it here
    const payload = { sub: user?.id, username: user?.username };

    // instead of the user object
    return {
      code: HttpStatus.OK,
      id: user?.id,
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: 1000 * 60
      }),
    };
  }

  async register(registerDto: RegisterDto) {
    console.log(await new mcrypto().encrypt(registerDto.password))
    const created_uesr:User =  this.em.create(User, {
      id: uuid.v4(),
      username: registerDto.username,
      password: (await new mcrypto().encrypt(registerDto.password)),
    });
    await this.em.flush();
    return {
      code: HttpStatus.OK,
      id: created_uesr.id
    };
  }

  async employee_info(registerDto: RegisterDto) {
    const created_employee = this.em.create(Employee, {
      id: uuid.v4(),
      name: registerDto.name,
      gender: registerDto.gender,
      age: registerDto.age,
      position: registerDto.position,
      department_id: registerDto.department_id,
      is_leader: registerDto.is_leader,
      user_id: registerDto.id,
    })
    await this.em.flush();
    return {
      code: HttpStatus.OK,
      id: created_employee.id,
      name: created_employee.name
    };
  }


  async load_department() {
    const departments = await this.em.find(Department, {})
    return departments;
  }
}
