import { ValidateUserUseCase } from '../../../../src/modules/user/application/use-cases/validate-user.use-case';
import { IUserRepository } from '../../../../src/modules/user/domain/repositories/user.repository.interface';
import { User } from '../../../../src/modules/user/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('ValidateUserUseCase', () => {
  let useCase: ValidateUserUseCase;
  let mockRepo: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      validateUser: jest.fn(),
    };
    useCase = new ValidateUserUseCase(mockRepo);
  });

  // ✅ Test para credenciales válidas
  it('should return user if credentials are valid', async () => {
    const email = 'onix@x2.com';
    const password = '123456';
    const hashedPassword = await bcrypt.hash(password, 10);

    const foundUser = new User('Onix', email, hashedPassword);

    mockRepo.findByEmail.mockResolvedValue(foundUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Simula que la contraseña coincide

    const result = await useCase.execute(email, password);

    expect(mockRepo.findByEmail).toHaveBeenCalledWith(email);
    expect(result).toEqual(foundUser);
  });

  // ❌ Test para credenciales inválidas
  it('should return null if credentials are invalid', async () => {
    const email = 'onix@x2.com';
    const password = 'wrongpass';
    const hashedPassword = await bcrypt.hash('123456', 10);

    const foundUser = new User('Onix', email, hashedPassword);

    mockRepo.findByEmail.mockResolvedValue(foundUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Simula que la contraseña NO coincide

    const result = await useCase.execute(email, password);

    expect(result).toBeNull();
  });

  // ❌ Test cuando no existe el usuario
  it('should return null if user not found', async () => {
    mockRepo.findByEmail.mockResolvedValue(null);

    const result = await useCase.execute('onix@x2.com', '123456');

    expect(result).toBeNull();
  });
});
