import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  AuthGuard,
  EmployeeDto,
  EmployeeService,
  ICreateEmployee,
  OperetorId,
} from "common";

@ApiTags("employees")
@Controller("employees")
@UseGuards(AuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(
    @Body() createEmployeeDto: ICreateEmployee,
    @OperetorId() operatorId: string
  ) {
    return this.employeeService.create(createEmployeeDto, operatorId);
  }

  @Get()
  findAll(
    @Query("name") name: string,
    @Query("position") position: string,
    @Query("gender") gender: string,
    @Query("is_leader") isLeader: boolean
  ) {
    return this.employeeService.findAll(name, position, gender, isLeader);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployeeDto: EmployeeDto,
    @OperetorId() operatorId: string
  ) {
    return this.employeeService.update(id, updateEmployeeDto, operatorId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeeService.remove(id);
  }
}
