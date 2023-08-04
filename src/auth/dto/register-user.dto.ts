import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 15)
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 15)
  password: string;
}
