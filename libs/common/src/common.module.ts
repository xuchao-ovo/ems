import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './users/entities/user.entity'
import { JwtModule } from '@nestjs/jwt';
import {jwtConstants} from './constants'
import { ConfigModule } from '@nestjs/config'
import { AuthService } from './auth/service/auth.service';
import { AuthGuard } from './auth/guard/auth.guard';
import { SalaryService } from './salary/service/salary.service';
import { RoleService } from './roles/service/role.service';
import { AttendanceService } from './attendance/service/attendance.service';
import { DepartmentService } from './departments/service/department.service';
import { EmployeeService } from './employee/service/employee.service';
@Module({
  providers: [
    AuthService,
    AuthGuard, 
    SalaryService,
    RoleService,
    AttendanceService,
    DepartmentService,
    EmployeeService,
    RoleService
  ],
  exports: [],
  imports:[
    ConfigModule,
    MikroOrmModule.forRoot({
      entities: [User],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class CommonModule {}
