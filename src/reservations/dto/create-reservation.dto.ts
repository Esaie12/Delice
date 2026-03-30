import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
