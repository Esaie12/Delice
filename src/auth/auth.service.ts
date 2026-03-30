import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EstablishmentType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../common/enums/role.enum';
import { LoginDto } from './dto/login.dto';
import {
  RegisterAdminDto,
  RegisterClientDto,
  RegisterDeliveryAgentDto,
  RegisterEstablishmentDto,
} from './dto/register-by-role.dto';
import { RegisterDto } from './dto/register.dto';

type JwtPayload = {
  sub: string;
  id: string;
  email: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /** Register a new account and issue tokens. */
  async register(dto: RegisterDto) {
    return this.registerWithRole(dto, dto.role ?? Role.CLIENT);
  }

  async registerClient(dto: RegisterClientDto) {
    return this.registerWithRole(dto, Role.CLIENT);
  }

  async registerEstablishment(dto: RegisterEstablishmentDto) {
    return this.registerWithRole(dto, Role.ESTABLISHMENT);
  }

  async registerDeliveryAgent(dto: RegisterDeliveryAgentDto) {
    return this.registerWithRole(dto, Role.DELIVERY_AGENT);
  }

  async registerAdmin(dto: RegisterAdminDto) {
    return this.registerWithRole(dto, Role.ADMIN);
  }

  private async registerWithRole(dto: RegisterDto, role: Role) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already in use');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          email: dto.email,
          password: hashed,
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: dto.phone,
          city: dto.city,
          role,
        },
      });

      if (role === Role.CLIENT) {
        await tx.client.create({
          data: { userId: createdUser.id },
        });
      }

      if (role === Role.DELIVERY_AGENT) {
        await tx.deliveryAgent.create({
          data: { userId: createdUser.id },
        });
      }

      if (role === Role.ESTABLISHMENT) {
        const establishmentDto = dto as RegisterEstablishmentDto;
        const establishmentData = establishmentDto.establishment;
        await tx.establishment.create({
          data: {
            ownerId: createdUser.id,
            name:
              establishmentData?.name ??
              `${createdUser.firstName} ${createdUser.lastName}`.trim(),
            description: establishmentData?.description,
            city: establishmentData?.city ?? createdUser.city ?? 'A_COMPLETER',
            address: establishmentData?.address ?? 'A compléter',
            type: establishmentData?.type ?? EstablishmentType.RESTAURANT,
            coverImageUrl: establishmentData?.coverImageUrl,
            openingHours: establishmentData?.openingHours,
          },
        });
      }

      if (role === Role.ADMIN) {
        await tx.admin.create({
          data: { userId: createdUser.id },
        });
      }

      return createdUser;
    });

    return this.generateTokens(user.id, user.email, user.role);
  }

  /** Authenticate an existing user and issue fresh tokens. */
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateTokens(user.id, user.email, user.role);
  }

  /** Rotate access token using a valid refresh token payload. */
  async refresh(userId: string, email: string, role: string) {
    return this.generateTokens(userId, email, role);
  }

  /** Revoke session tokens for a user. */
  async logout(userId: string) {
    await this.prisma.user.update({ where: { id: userId }, data: { refreshTokenHash: null } });
    return { loggedOut: true };
  }

  /** Read profile of authenticated user. */
  async me(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  
  private async generateTokens(userId: string, email: string, role: string) {
  const payload = {
    sub: userId,
    email,
    role,
  };

  const accessToken = await this.jwtService.signAsync(payload as any, {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN as any,
  });

  const refreshToken = await this.jwtService.signAsync(payload as any, {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as any,
  });

  await this.prisma.user.update({
    where: { id: userId },
    data: { refreshTokenHash: await bcrypt.hash(refreshToken, 10) },
  });

  return { accessToken, refreshToken };
}
}
