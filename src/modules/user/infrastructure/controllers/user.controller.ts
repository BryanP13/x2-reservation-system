import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { ValidateUserUseCase } from '../../application/use-cases/validate-user.use-case';
import { AuthService } from '../../../auth/services/auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly authService: AuthService, // 🔑 inyectamos AuthService
  ) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    const user = await this.createUserUseCase.execute(body);
    const { password, ...safeUser } = user.toPrimitives();
    return {
      message: 'User created successfully',
      user: safeUser,
    };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.validateUserUseCase.execute(body);
    if (!user) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    // 🔑 Generar token JWT
    const token = await this.authService.generateToken({ id: user.id!.toString(), email: user.email });

    const { password, ...safeUser } = user.toPrimitives();
    return {
      message: 'Login successful',
      access_token: token.access_token, // 🔑 aquí va el token
      user: safeUser,
    };
  }
}
