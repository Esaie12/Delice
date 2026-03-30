import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new orders. */
  async create(dto: CreateOrderDto) {
    return this.prisma.order.create({ data: dto as never });
  }

  /** Get paginated list of orders. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.order.findMany({ skip, take: pagination.limit });
  }

  /** Get orders detail. */
  async findOne(id: string) {
    const entity = await this.prisma.order.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Orders not found');
    return entity;
  }

  /** Update orders. */
  async update(id: string, dto: UpdateOrderDto) {
    await this.findOne(id);
    return this.prisma.order.update({ where: { id }, data: dto as never });
  }

  /** Delete orders. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.order.delete({ where: { id } });
  }
}
