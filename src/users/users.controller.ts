import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister' })
  @ApiResponse({ status: 200 })
  findAll(@Query() pagination: PaginationDto) {
    return this.service.findAll(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail' })
  @ApiResponse({ status: 200 })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
