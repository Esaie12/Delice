import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateAnalyticDto } from './dto/create-analytic.dto';
import { UpdateAnalyticDto } from './dto/update-analytic.dto';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new analytics. */
  async create(dto: CreateAnalyticDto) {
    return this.prisma.order.create({ data: dto as never });
  }

  /** Get paginated list of analytics. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.order.findMany({ skip, take: pagination.limit });
  }

  /** Get analytics detail. */
  async findOne(id: string) {
    const entity = await this.prisma.order.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Analytics not found');
    return entity;
  }

  /** Update analytics. */
  async update(id: string, dto: UpdateAnalyticDto) {
    await this.findOne(id);
    return this.prisma.order.update({ where: { id }, data: dto as never });
  }

  /** Delete analytics. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.order.delete({ where: { id } });
  }
}
