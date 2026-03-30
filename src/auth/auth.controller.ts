import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Inscription client' })
  @ApiResponse({ status: 201 })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Connexion' })
  @ApiResponse({ status: 200 })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Rafraîchir le token' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  refresh(@CurrentUser() user: Record<string, string>) {
    return this.authService.refresh(user.id, user.email, user.role);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Déconnexion' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  logout(@CurrentUser() user: Record<string, string>) {
    return this.authService.logout(user.id);
  }

  @Get('me')
  @ApiOperation({ summary: 'Profil connecté' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: Record<string, string>) {
    return this.authService.me(user.id);
  }
}
