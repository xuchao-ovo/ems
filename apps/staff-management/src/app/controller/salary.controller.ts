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
import { AuthGuard, SalaryDto, OperetorId, SalaryService } from 'common';



@ApiTags('salaries')
@Controller('salaries')
@UseGuards(AuthGuard)
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post()
  create(@Body() createSalaryDto: SalaryDto, @OperetorId()operatorId: string) {
    return this.salaryService.create(createSalaryDto, operatorId);
  }

  @Get()
  findAll() {
    return this.salaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalaryDto: SalaryDto, @OperetorId() operatorId: string) {
    return this.salaryService.update(id, updateSalaryDto, operatorId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaryService.remove(id);
  }
}
