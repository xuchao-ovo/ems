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
import { AuthGuard, DepartmentDto, DepartmentService, OperetorId } from 'common';



@UseGuards(AuthGuard)
@ApiTags('departments')
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: DepartmentDto, @OperetorId()operatorId: string) {
    return this.departmentService.create(createDepartmentDto, operatorId);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateDepartmentDto: DepartmentDto, @OperetorId() operatorId: string) {
    return this.departmentService.update(id, updateDepartmentDto, operatorId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }
}
