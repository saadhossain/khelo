import { IsString, IsBoolean, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  authProvider: string;
  @IsString()
  fullName: string;
  @IsEmail()
  email: string;
  @IsString()
  photoURL: string;
  @IsBoolean()
  emailVerified: boolean;
}
