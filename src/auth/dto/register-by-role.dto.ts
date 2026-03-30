import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EstablishmentType } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterByRoleDto {
  @ApiProperty({ example: 'user@delice.app', description: 'Email du compte utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MotDePasse123!', description: 'Mot de passe (min. 8 caractères)' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Moussa' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Sow' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: '+221770001122', nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Dakar', nullable: true })
  @IsOptional()
  @IsString()
  city?: string;
}

export class RegisterClientDto extends RegisterByRoleDto {}

export class RegisterDeliveryAgentDto extends RegisterByRoleDto {}

export class RegisterAdminDto extends RegisterByRoleDto {}

export class RegisterEstablishmentDataDto {
  @ApiPropertyOptional({ example: 'Le Jardin Gourmand', nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Cuisine sénégalaise et africaine', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Dakar', nullable: true })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Point E, Rue 12', nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ enum: EstablishmentType, nullable: true })
  @IsOptional()
  @IsEnum(EstablishmentType)
  type?: EstablishmentType;

  @ApiPropertyOptional({ example: 'https://cdn.delice.app/cover.jpg', nullable: true })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @ApiPropertyOptional({ example: '08:00-23:00', nullable: true })
  @IsOptional()
  @IsString()
  openingHours?: string;
}

export class RegisterEstablishmentDto extends RegisterByRoleDto {
  @ApiPropertyOptional({
    type: RegisterEstablishmentDataDto,
    nullable: true,
    description: 'Attributs de l’entité Establishment',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RegisterEstablishmentDataDto)
  establishment?: RegisterEstablishmentDataDto;
}
