import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaginationDto } from '../common/dto/pagination.dto';
import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@ApiTags('Establishments')
@Controller('establishments')
export class EstablishmentsController {
  constructor(private readonly service: EstablishmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateEstablishmentDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateEstablishmentDto) {
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
