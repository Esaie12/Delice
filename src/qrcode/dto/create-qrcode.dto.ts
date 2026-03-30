import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateQrcodeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
