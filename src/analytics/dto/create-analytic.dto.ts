import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAnalyticDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
