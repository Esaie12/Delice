import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
