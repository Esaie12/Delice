import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new payments. */
  async create(dto: CreatePaymentDto) {
    return this.prisma.payment.create({ data: dto as never });
  }

  /** Get paginated list of payments. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.payment.findMany({ skip, take: pagination.limit });
  }

  /** Get payments detail. */
  async findOne(id: string) {
    const entity = await this.prisma.payment.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Payments not found');
    return entity;
  }

  /** Update payments. */
  async update(id: string, dto: UpdatePaymentDto) {
    await this.findOne(id);
    return this.prisma.payment.update({ where: { id }, data: dto as never });
  }

  /** Delete payments. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.payment.delete({ where: { id } });
  }
}
