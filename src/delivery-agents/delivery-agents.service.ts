import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateDeliveryAgentDto } from './dto/create-delivery-agent.dto';
import { UpdateDeliveryAgentDto } from './dto/update-delivery-agent.dto';

@Injectable()
export class DeliveryAgentsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new delivery-agents. */
  async create(dto: CreateDeliveryAgentDto) {
    return this.prisma.deliveryAgent.create({ data: dto as never });
  }

  /** Get paginated list of delivery-agents. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.deliveryAgent.findMany({ skip, take: pagination.limit });
  }

  /** Get delivery-agents detail. */
  async findOne(id: string) {
    const entity = await this.prisma.deliveryAgent.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('DeliveryAgents not found');
    return entity;
  }

  /** Update delivery-agents. */
  async update(id: string, dto: UpdateDeliveryAgentDto) {
    await this.findOne(id);
    return this.prisma.deliveryAgent.update({ where: { id }, data: dto as never });
  }

  /** Delete delivery-agents. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.deliveryAgent.delete({ where: { id } });
  }
}
