import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateDeliverieDto } from './dto/create-deliverie.dto';
import { UpdateDeliverieDto } from './dto/update-deliverie.dto';

@Injectable()
export class DeliveriesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new deliveries. */
  async create(dto: CreateDeliverieDto) {
    return this.prisma.delivery.create({ data: dto as never });
  }

  /** Get paginated list of deliveries. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.delivery.findMany({ skip, take: pagination.limit });
  }

  /** Get deliveries detail. */
  async findOne(id: string) {
    const entity = await this.prisma.delivery.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Deliveries not found');
    return entity;
  }

  /** Update deliveries. */
  async update(id: string, dto: UpdateDeliverieDto) {
    await this.findOne(id);
    return this.prisma.delivery.update({ where: { id }, data: dto as never });
  }

  /** Delete deliveries. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.delivery.delete({ where: { id } });
  }
}
