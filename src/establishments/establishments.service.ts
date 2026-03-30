import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@Injectable()
export class EstablishmentsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new establishments. */
  async create(dto: CreateEstablishmentDto) {
    return this.prisma.establishment.create({ data: dto as never });
  }

  /** Get paginated list of establishments. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.establishment.findMany({ skip, take: pagination.limit });
  }

  /** Get establishments detail. */
  async findOne(id: string) {
    const entity = await this.prisma.establishment.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Establishments not found');
    return entity;
  }

  /** Update establishments. */
  async update(id: string, dto: UpdateEstablishmentDto) {
    await this.findOne(id);
    return this.prisma.establishment.update({ where: { id }, data: dto as never });
  }

  /** Delete establishments. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.establishment.delete({ where: { id } });
  }
}
