import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDeliverieDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
