import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateLoyaltyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
