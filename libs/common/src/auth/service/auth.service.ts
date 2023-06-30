import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';
import { Md5 } from 'ts-md5'
@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        // 将密码加密，与数据库密码进行比对
        const md5: Md5 = new Md5();
        md5.appendStr(pass);
        const cryptedPass =  md5.end()
        if (user?.password !== cryptedPass) {
          throw new UnauthorizedException();
        } 
        // TODO: Generate a JWT and return it here
        const payload = { sub: user?.id, username: user?.username};
        
        // instead of the user object
        return {
          access_token: await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
            expiresIn: 1000*60
          }),
        };
      }
    
      async register(){
        return null
      }
}
