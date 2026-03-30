import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new categories. */
  async create(dto: CreateCategorieDto) {
    return this.prisma.category.create({ data: dto as never });
  }

  /** Get paginated list of categories. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.category.findMany({ skip, take: pagination.limit });
  }

  /** Get categories detail. */
  async findOne(id: string) {
    const entity = await this.prisma.category.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Categories not found');
    return entity;
  }

  /** Update categories. */
  async update(id: string, dto: UpdateCategorieDto) {
    await this.findOne(id);
    return this.prisma.category.update({ where: { id }, data: dto as never });
  }

  /** Delete categories. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.category.delete({ where: { id } });
  }
}
