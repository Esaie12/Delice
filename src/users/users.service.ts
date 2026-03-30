import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new users. */
  async create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto as never });
  }

  /** Get paginated list of users. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.user.findMany({ skip, take: pagination.limit });
  }

  /** Get users detail. */
  async findOne(id: string) {
    const entity = await this.prisma.user.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Users not found');
    return entity;
  }

  /** Update users. */
  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);
    return this.prisma.user.update({ where: { id }, data: dto as never });
  }

  /** Delete users. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
