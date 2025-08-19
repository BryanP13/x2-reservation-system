import * as bcrypt from 'bcrypt';

export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    private _password: string, // 🔑 hash de la contraseña
    public readonly id?: number,
  ) {}

  // ✅ Valida comparando contra el hash
  async isPasswordValid(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this._password);
  }

  // Getter para acceder al hash si se necesita
  get password(): string {
    return this._password;
  }

  // Cambiar contraseña en un flujo futuro
  async setPassword(newPassword: string): Promise<void> {
    this._password = await bcrypt.hash(newPassword, 10);
  }

  // ✅ Devuelve un objeto plano (sin exponer métodos de dominio)
  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this._password, // Ojo: aquí sigue saliendo el hash, hay que filtrarlo en el controlador
    };
  }
}
