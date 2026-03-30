import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateDeliveryZoneDto } from './dto/create-delivery-zone.dto';
import { UpdateDeliveryZoneDto } from './dto/update-delivery-zone.dto';

@Injectable()
export class DeliveryZonesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new delivery-zones. */
  async create(dto: CreateDeliveryZoneDto) {
    return this.prisma.deliveryZone.create({ data: dto as never });
  }

  /** Get paginated list of delivery-zones. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.deliveryZone.findMany({ skip, take: pagination.limit });
  }

  /** Get delivery-zones detail. */
  async findOne(id: string) {
    const entity = await this.prisma.deliveryZone.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('DeliveryZones not found');
    return entity;
  }

  /** Update delivery-zones. */
  async update(id: string, dto: UpdateDeliveryZoneDto) {
    await this.findOne(id);
    return this.prisma.deliveryZone.update({ where: { id }, data: dto as never });
  }

  /** Delete delivery-zones. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.deliveryZone.delete({ where: { id } });
  }
}
