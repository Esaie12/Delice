import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  RegisterAdminDto,
  RegisterClientDto,
  RegisterDeliveryAgentDto,
  RegisterEstablishmentDto,
} from './dto/register-by-role.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Inscription client',
    description: 'Inscription standard avec possibilité de préciser role (sinon CLIENT par défaut).',
  })
  @ApiBody({
    type: RegisterDto,
    examples: {
      client: {
        summary: 'Exemple JSON',
        value: {
          email: 'client@delice.app',
          password: 'MotDePasse123!',
          firstName: 'Awa',
          lastName: 'Diallo',
          city: 'Dakar',
          phone: '+221770001122',
          role: 'CLIENT',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Compte créé avec succès (retourne accessToken et refreshToken).',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('register/client')
  @ApiOperation({ summary: 'Inscription client (route dédiée)' })
  @ApiBody({
    type: RegisterClientDto,
    examples: {
      client: {
        summary: 'Exemple JSON',
        value: {
          email: 'client@delice.app',
          password: 'MotDePasse123!',
          firstName: 'Awa',
          lastName: 'Diallo',
          city: 'Dakar',
          phone: '+221770001122',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Client créé avec succès.' })
  registerClient(@Body() dto: RegisterClientDto) {
    return this.authService.registerClient(dto);
  }

  @Post('register/establishment')
  @ApiOperation({
    summary: 'Inscription établissement (route dédiée)',
    description: 'Inscription owner + attributs de l’entité Establishment.',
  })
  @ApiBody({
    type: RegisterEstablishmentDto,
    examples: {
      establishment: {
        summary: 'Exemple JSON',
        value: {
          email: 'owner@delice.app',
          password: 'MotDePasse123!',
          firstName: 'Mame',
          lastName: 'Ndiaye',
          city: 'Dakar',
          phone: '+221778889900',
          establishment: {
            name: 'Le Jardin Gourmand',
            description: 'Cuisine locale et internationale',
            city: 'Dakar',
            address: 'Point E, Rue 12',
            type: 'RESTAURANT',
            coverImageUrl: 'https://cdn.delice.app/cover.jpg',
            openingHours: '08:00-23:00',
          },
        },
      },
      establishmentNullable: {
        summary: 'Exemple avec champs nullable',
        value: {
          email: 'owner2@delice.app',
          password: 'MotDePasse123!',
          firstName: 'Aminata',
          lastName: 'Fall',
          city: null,
          phone: null,
          establishment: {
            name: 'Snack Express',
            description: null,
            city: null,
            address: 'Sacré-Cœur 3',
            type: 'RESTAURANT',
            coverImageUrl: null,
            openingHours: null,
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Établissement créé avec succès.' })
  registerEstablishment(@Body() dto: RegisterEstablishmentDto) {
    return this.authService.registerEstablishment(dto);
  }

  @Post('register/delivery-agent')
  @ApiOperation({ summary: 'Inscription agent de livraison (route dédiée)' })
  @ApiBody({
    type: RegisterDeliveryAgentDto,
    examples: {
      deliveryAgent: {
        summary: 'Exemple JSON',
        value: {
          email: 'agent@delice.app',
          password: 'MotDePasse123!',
          firstName: 'Ibrahima',
          lastName: 'Ba',
          city: 'Dakar',
          phone: '+221771234567',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Agent de livraison créé avec succès.' })
  registerDeliveryAgent(@Body() dto: RegisterDeliveryAgentDto) {
    return this.authService.registerDeliveryAgent(dto);
  }

  @Post('register/admin')
  @ApiOperation({ summary: 'Inscription admin (route dédiée)' })
  @ApiBody({
    type: RegisterAdminDto,
    examples: {
      admin: {
        summary: 'Exemple JSON',
        value: {
          email: 'admin@delice.app',
          password: 'MotDePasse123!',
          firstName: 'Fatou',
          lastName: 'Diop',
          city: 'Dakar',
          phone: '+221779991122',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Administrateur créé avec succès.' })
  registerAdmin(@Body() dto: RegisterAdminDto) {
    return this.authService.registerAdmin(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Connexion' })
  @ApiBody({
    type: LoginDto,
    examples: {
      login: {
        summary: 'Exemple JSON',
        value: {
          email: 'client@delice.app',
          password: 'MotDePasse123!',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Connexion réussie (retourne accessToken et refreshToken).',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Rafraîchir le token' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Nouveaux tokens générés.' })
  @UseGuards(JwtAuthGuard)
  refresh(@CurrentUser() user: Record<string, string>) {
    return this.authService.refresh(user.id, user.email, user.role);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Déconnexion' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Session invalidée avec succès.' })
  @UseGuards(JwtAuthGuard)
  logout(@CurrentUser() user: Record<string, string>) {
    return this.authService.logout(user.id);
  }

  @Get('me')
  @ApiOperation({ summary: 'Profil connecté' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Profil utilisateur connecté.' })
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: Record<string, string>) {
    return this.authService.me(user.id);
  }
}
