// src/modules/user/application/use-cases/validate-user.use-case.ts

import { Injectable, Inject } from '@nestjs/common'; 
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface'; // ✅ usa el token
import { User } from '../../domain/entities/user.entity';

interface ValidateUserDto {
  email: string;
  password: string;
}

@Injectable() // 
export class ValidateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) 
    private readonly userRepository: IUserRepository
  ) {}

  async execute(dto: ValidateUserDto): Promise<User | null> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) return null;

    const isValid = user.isPasswordValid(dto.password);
    if (!isValid) return null;

    return user;
  }
}