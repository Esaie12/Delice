import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDeliveryAgentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
