export class LoginResponseDto {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
