import { Injectable, Inject, ConflictException } from '@nestjs/common'; 
import { IUserRepository, USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

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
      throw new ConflictException('User with this email already exists');
    }

    // 🔑 Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new User(dto.name, dto.email, hashedPassword);
    return await this.userRepository.create(user);
  }
}
