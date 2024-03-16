import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import {
  Attendance,
  AttendanceService,
  AuthService,
  Department,
  DepartmentService,
  Employee,
  EmployeeService,
  Role,
  RoleService,
  Salary,
  SalaryService,
  User,
  User_role,
  UsersService,
} from "common";
import { AuthController } from "./controller/auth.controller";
import { UsersController } from "./controller/users.controller";
import { JwtService } from "@nestjs/jwt";
import { DepartmentController } from "./controller/department.controller";
import { AttendanceController } from "./controller/attendance.controller";
import { EmployeeController } from "./controller/employee.controller";
import { RoleController } from "./controller/role.controller";
import { SalaryController } from "./controller/salary.controller";

@Module({
  imports: [
    AppModule,
    MikroOrmModule.forRoot({
      entities: [
        User,
        User_role,
        Role,
        Department,
        Attendance,
        Employee,
        Salary,
      ],
      dbName: "postgres",
      type: "postgresql",
      host: "localhost",
      user: "postgres",
      password: "123456",
      port: 5432,
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    AttendanceController,
    DepartmentController,
    EmployeeController,
    RoleController,
    SalaryController,
  ],
  providers: [
    AppService,
    UsersService,
    AuthService,
    DepartmentService,
    SalaryService,
    RoleService,
    EmployeeService,
    AttendanceService,
    JwtService,
  ],
})
export class AppModule {}
