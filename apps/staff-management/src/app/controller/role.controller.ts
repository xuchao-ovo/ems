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
import { AuthGuard, RoleService } from 'common';




@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Post()
  // @UseGuards(AuthGuard)
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.departmentService.create(createUserDto);
  // }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  // @Patch(':id')
  // @UseGuards(AuthGuard)
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.departmentService.update(id, updateUserDto);
  // }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
