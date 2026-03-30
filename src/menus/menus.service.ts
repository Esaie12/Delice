import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new menus. */
  async create(dto: CreateMenuDto) {
    return this.prisma.menu.create({ data: dto as never });
  }

  /** Get paginated list of menus. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.menu.findMany({ skip, take: pagination.limit });
  }

  /** Get menus detail. */
  async findOne(id: string) {
    const entity = await this.prisma.menu.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Menus not found');
    return entity;
  }

  /** Update menus. */
  async update(id: string, dto: UpdateMenuDto) {
    await this.findOne(id);
    return this.prisma.menu.update({ where: { id }, data: dto as never });
  }

  /** Delete menus. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.menu.delete({ where: { id } });
  }
}
