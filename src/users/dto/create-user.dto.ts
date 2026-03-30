import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
