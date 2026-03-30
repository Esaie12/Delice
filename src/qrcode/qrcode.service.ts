import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateQrcodeDto } from './dto/create-qrcode.dto';
import { UpdateQrcodeDto } from './dto/update-qrcode.dto';

@Injectable()
export class QrcodeService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new qrcode. */
  async create(dto: CreateQrcodeDto) {
    return this.prisma.establishment.create({ data: dto as never });
  }

  /** Get paginated list of qrcode. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.establishment.findMany({ skip, take: pagination.limit });
  }

  /** Get qrcode detail. */
  async findOne(id: string) {
    const entity = await this.prisma.establishment.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Qrcode not found');
    return entity;
  }

  /** Update qrcode. */
  async update(id: string, dto: UpdateQrcodeDto) {
    await this.findOne(id);
    return this.prisma.establishment.update({ where: { id }, data: dto as never });
  }

  /** Delete qrcode. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.establishment.delete({ where: { id } });
  }
}
