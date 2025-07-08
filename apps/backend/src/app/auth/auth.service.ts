import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar usuário por email
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: { enterprise: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar se o usuário está ativo
    if (!user.active) {
      throw new UnauthorizedException('Usuário inativo');
    }

    // Gerar token JWT
    const payload = {
      idUser: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      enterpriseId: user.enterpriseId,
      enterpriseName: user.enterprise.legalName,
      permissions: user.permissions,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        enterprise: {
          id: user.enterprise.id,
          name: user.enterprise.legalName,
        },
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const { name, email, password, enterpriseId, role } = createUserDto;

    // Verificar se o usuário já existe
    const existingUser = await this.prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Usuário já existe');
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        enterpriseId,
        role: role || 'USER',
        active: true,
        permissions: role === 'ADMIN' ? 'ADMIN' : 'USER',
      },
      include: { enterprise: true },
    });

    // Remover senha do retorno
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { enterprise: true },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}