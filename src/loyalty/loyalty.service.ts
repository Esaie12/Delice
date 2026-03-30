import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';

@Injectable()
export class LoyaltyService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new loyalty. */
  async create(dto: CreateLoyaltyDto) {
    return this.prisma.loyaltyCard.create({ data: dto as never });
  }

  /** Get paginated list of loyalty. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.loyaltyCard.findMany({ skip, take: pagination.limit });
  }

  /** Get loyalty detail. */
  async findOne(id: string) {
    const entity = await this.prisma.loyaltyCard.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Loyalty not found');
    return entity;
  }

  /** Update loyalty. */
  async update(id: string, dto: UpdateLoyaltyDto) {
    await this.findOne(id);
    return this.prisma.loyaltyCard.update({ where: { id }, data: dto as never });
  }

  /** Delete loyalty. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.loyaltyCard.delete({ where: { id } });
  }
}
