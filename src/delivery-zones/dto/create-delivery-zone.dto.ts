import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDeliveryZoneDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
