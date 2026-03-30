import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterByRoleDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;
}

export class RegisterClientDto extends RegisterByRoleDto {}

export class RegisterDeliveryAgentDto extends RegisterByRoleDto {}

export class RegisterAdminDto extends RegisterByRoleDto {}

export class RegisterEstablishmentDto extends RegisterByRoleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  establishmentName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  establishmentDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  establishmentCity?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  establishmentAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  establishmentType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  establishmentCoverImageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  establishmentOpeningHours?: string;
}
