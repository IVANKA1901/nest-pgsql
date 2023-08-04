import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 15)
  public username: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsNumber()
  @IsNotEmpty()
  public age: number;

  @IsBoolean()
  @IsOptional()
  public status: boolean;

  @IsString()
  @IsNotEmpty()
  @Length(2, 15)
  public password: string;
}
