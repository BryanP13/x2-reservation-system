// src/modules/user/application/use-cases/create-user.use-case.ts

import { Injectable, Inject } from '@nestjs/common'; 
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) 
    private readonly userRepository: IUserRepository
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = new User(dto.name, dto.email, dto.password);
    return await this.userRepository.create(user);
  }
}