import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

interface LoginUserDto {
  email: string;
  password: string;
}

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(dto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await user.isPasswordValid(dto.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
