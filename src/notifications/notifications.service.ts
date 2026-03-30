import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new notifications. */
  async create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({ data: dto as never });
  }

  /** Get paginated list of notifications. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.notification.findMany({ skip, take: pagination.limit });
  }

  /** Get notifications detail. */
  async findOne(id: string) {
    const entity = await this.prisma.notification.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Notifications not found');
    return entity;
  }

  /** Update notifications. */
  async update(id: string, dto: UpdateNotificationDto) {
    await this.findOne(id);
    return this.prisma.notification.update({ where: { id }, data: dto as never });
  }

  /** Delete notifications. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.notification.delete({ where: { id } });
  }
}
