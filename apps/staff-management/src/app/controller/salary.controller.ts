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
import { AuthGuard, SalaryService } from 'common';




@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  // @Post()
  // @UseGuards(AuthGuard)
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.departmentService.create(createUserDto);
  // }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.salaryService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.salaryService.findOne(id);
  }

  // @Patch(':id')
  // @UseGuards(AuthGuard)
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.departmentService.update(id, updateUserDto);
  // }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.salaryService.remove(id);
  }
}
