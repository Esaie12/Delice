import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
