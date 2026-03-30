import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new items. */
  async create(dto: CreateItemDto) {
    return this.prisma.item.create({ data: dto as never });
  }

  /** Get paginated list of items. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.item.findMany({ skip, take: pagination.limit });
  }

  /** Get items detail. */
  async findOne(id: string) {
    const entity = await this.prisma.item.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Items not found');
    return entity;
  }

  /** Update items. */
  async update(id: string, dto: UpdateItemDto) {
    await this.findOne(id);
    return this.prisma.item.update({ where: { id }, data: dto as never });
  }

  /** Delete items. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.item.delete({ where: { id } });
  }
}
