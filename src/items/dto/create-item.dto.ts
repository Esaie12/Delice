import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
