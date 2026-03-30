import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class RegisterDto {
  @ApiProperty({
    example: 'client@delice.app',
    description: 'Adresse email unique de connexion',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'MotDePasse123!',
    description: 'Mot de passe (8 caractères minimum)',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Awa' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Diallo' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    example: 'Dakar',
    nullable: true,
    description: 'Ville de résidence (nullable)',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    example: '+221770001122',
    nullable: true,
    description: 'Numéro de téléphone (nullable)',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ enum: Role, nullable: true })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
