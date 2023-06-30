import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, EmployeeService } from 'common';




@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // @Post()
  // @UseGuards(AuthGuard)
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.departmentService.create(createUserDto);
  // }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  // @Patch(':id')
  // @UseGuards(AuthGuard)
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.departmentService.update(id, updateUserDto);
  // }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
