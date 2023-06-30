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
import { AttendanceService, AuthGuard } from 'common';




@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // @Post()
  // @UseGuards(AuthGuard)
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.departmentService.create(createUserDto);
  // }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }

  // @Patch(':id')
  // @UseGuards(AuthGuard)
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.departmentService.update(id, updateUserDto);
  // }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(id);
  }
}
