import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { ValidateUserUseCase } from '../../application/use-cases/validate-user.use-case';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() dto: { name: string; email: string; password: string }) {
    const user = await this.createUserUseCase.execute(dto);
    return {
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  @Post('login')
  async login(@Body() dto: { email: string; password: string }) {
    const user = await this.validateUserUseCase.execute(dto);
    if (!user) {
      return {
        message: 'Invalid credentials',
      };
    }

    const token = await this.authService.generateToken({
      id: user.id!.toString(),
      email: user.email,
    });

    return {
      message: 'Login successful',
      access_token: token.access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    return {
      message: 'Protected route access granted',
      user: req.user,
    };
  }
}
