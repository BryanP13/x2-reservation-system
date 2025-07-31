// src/modules/user/domain/entities/user.entity.ts

export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    private _password: string, // solo accesible desde dentro
    public readonly id?: number, // opcional al crear
  ) {}

  // Método para validar la contraseña (sin exponerla directamente)
  isPasswordValid(password: string): boolean {
    return this._password === password; // en el futuro aquí iría bcrypt.compare
  }

  // Método para obtener la contraseña en caso de necesitarla internamente
  get password(): string {
    return this._password;
  }
}
