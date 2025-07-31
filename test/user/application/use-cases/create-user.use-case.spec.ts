// Importamos el caso de uso a probar, la interfaz del repositorio (mockeada) y la entidad User
import { CreateUserUseCase } from '../../../../src/modules/user/application/use-cases/create-user.use-case';
import { IUserRepository } from '../../../../src/modules/user/domain/repositories/user.repository.interface';
import { User } from '../../../../src/modules/user/domain/entities/user.entity';

// Grupo de pruebas para CreateUserUseCase
describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase; // Instancia real del caso de uso
  let mockRepo: jest.Mocked<IUserRepository>; // Repositorio falso para simular la base de datos

  // Antes de cada prueba, inicializamos el mock y el caso de uso
  beforeEach(() => {
    mockRepo = {
      create: jest.fn(), // función falsa para simular crear un usuario
      findByEmail: jest.fn(), // no se usa en esta prueba pero es parte de la interfaz
      validateUser: jest.fn(), // tampoco se usa aquí, pero necesario por la interfaz
    };

    // Inyectamos el repositorio falso al caso de uso
    useCase = new CreateUserUseCase(mockRepo);
  });

  // Prueba: debe crear un usuario y devolverlo
  it('should create a user and return it', async () => {
    // Simulamos los datos del DTO de entrada
    const dto = {
      name: 'Onix',
      email: 'onix@x2.com',
      password: '123456',
    };

    // Simulamos que el repositorio devuelve este usuario cuando se llama a create()
    const createdUser = new User(dto.name, dto.email, dto.password);
    mockRepo.create.mockResolvedValue(createdUser);

    // Ejecutamos el caso de uso con el DTO
    const result = await useCase.execute(dto);

    // Verificamos que mockRepo.create fue llamado correctamente con una instancia de User
    expect(mockRepo.create).toHaveBeenCalledWith(expect.any(User));

    // Verificamos que el resultado devuelto sea igual al usuario creado simulado
    expect(result).toEqual(createdUser);
  });
});
