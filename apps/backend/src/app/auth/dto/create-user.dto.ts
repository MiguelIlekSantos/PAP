export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  enterpriseId: number;
  role?: string;
}