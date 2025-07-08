import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from '../../lib/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  async getProfile(@Request() req) {
    return this.authService.getUserById(req.user.idUser);
  }

  @Get('validate')
  @UseGuards(JwtGuard)
  async validateToken(@Request() req) {
    return {
      valid: true,
      user: req.user,
    };
  }
}