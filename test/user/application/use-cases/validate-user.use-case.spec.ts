import { ValidateUserUseCase } from '../../../../src/modules/user/application/use-cases/validate-user.use-case';
import { IUserRepository } from '../../../../src/modules/user/domain/repositories/user.repository.interface';
import { User } from '../../../../src/modules/user/domain/entities/user.entity';

describe('ValidateUserUseCase', () => {
  let useCase: ValidateUserUseCase;
  let mockRepo: jest.Mocked<IUserRepository>;

  // Antes de cada prueba, inicializamos el mock del repositorio y el caso de uso
  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),           // No se usa aquí, pero forma parte del contrato
      findByEmail: jest.fn(),      // Tampoco usado aquí directamente
      validateUser: jest.fn(),     // Este sí es crucial para esta prueba
    };

    // Inyectamos el mock al caso de uso
    useCase = new ValidateUserUseCase(mockRepo);
  });

  // ✅ Prueba 1: usuario válido
  it('should return the user if credentials are valid', async () => {
    const email = 'onix@x2.com';
    const password = '123456';

    const validUser = new User('Onix', email, password);
    mockRepo.validateUser.mockResolvedValue(validUser);

    const result = await useCase.execute(email, password);

    expect(mockRepo.validateUser).toHaveBeenCalledWith(email, password);
    expect(result).toEqual(validUser);
  });

  // ❌ Prueba 2: credenciales incorrectas
  it('should return null if credentials are invalid', async () => {
    const email = 'invalid@example.com';
    const password = 'wrongpassword';

    mockRepo.validateUser.mockResolvedValue(null);

    const result = await useCase.execute(email, password);

    expect(mockRepo.validateUser).toHaveBeenCalledWith(email, password);
    expect(result).toBeNull();
  });
});
