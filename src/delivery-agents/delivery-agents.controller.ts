import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaginationDto } from '../common/dto/pagination.dto';
import { DeliveryAgentsService } from './delivery-agents.service';
import { CreateDeliveryAgentDto } from './dto/create-delivery-agent.dto';
import { UpdateDeliveryAgentDto } from './dto/update-delivery-agent.dto';

@ApiTags('Delivery Agents')
@Controller('delivery-agents')
export class DeliveryAgentsController {
  constructor(private readonly service: DeliveryAgentsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateDeliveryAgentDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateDeliveryAgentDto) {
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
