import { OmitType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';

export class RegisterByRoleDto extends OmitType(RegisterDto, ['role'] as const) {}
