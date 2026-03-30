import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEstablishmentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
