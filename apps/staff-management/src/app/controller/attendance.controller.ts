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
import { ApiTags } from '@nestjs/swagger';
import { AttendanceDto, AttendanceService, AuthGuard, OperetorId } from 'common';



@ApiTags('attendances')
@UseGuards(AuthGuard)
@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() createAttendanceDto: AttendanceDto, @OperetorId()operatorId: string) {
    return this.attendanceService.create(createAttendanceDto, operatorId);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceDto: AttendanceDto, @OperetorId()operatorId: string) {
    return this.attendanceService.update(id, updateAttendanceDto, operatorId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(id);
  }
}
