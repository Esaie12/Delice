import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
