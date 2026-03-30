import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new reservations. */
  async create(dto: CreateReservationDto) {
    return this.prisma.reservation.create({ data: dto as never });
  }

  /** Get paginated list of reservations. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.reservation.findMany({ skip, take: pagination.limit });
  }

  /** Get reservations detail. */
  async findOne(id: string) {
    const entity = await this.prisma.reservation.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Reservations not found');
    return entity;
  }

  /** Update reservations. */
  async update(id: string, dto: UpdateReservationDto) {
    await this.findOne(id);
    return this.prisma.reservation.update({ where: { id }, data: dto as never });
  }

  /** Delete reservations. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.reservation.delete({ where: { id } });
  }
}
