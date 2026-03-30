import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create a new reviews. */
  async create(dto: CreateReviewDto) {
    return this.prisma.review.create({ data: dto as never });
  }

  /** Get paginated list of reviews. */
  async findAll(pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.prisma.review.findMany({ skip, take: pagination.limit });
  }

  /** Get reviews detail. */
  async findOne(id: string) {
    const entity = await this.prisma.review.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Reviews not found');
    return entity;
  }

  /** Update reviews. */
  async update(id: string, dto: UpdateReviewDto) {
    await this.findOne(id);
    return this.prisma.review.update({ where: { id }, data: dto as never });
  }

  /** Delete reviews. */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.review.delete({ where: { id } });
  }
}
