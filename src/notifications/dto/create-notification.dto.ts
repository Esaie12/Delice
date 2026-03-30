import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
