// src/modules/user/application/use-cases/validate-user.use-case.ts

import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

interface ValidateUserDto {
  email: string;
  password: string;
}

export class ValidateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: ValidateUserDto): Promise<User | null> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) return null;

    const isValid = user.isPasswordValid(dto.password);
    if (!isValid) return null;

    return user;
  }
}
