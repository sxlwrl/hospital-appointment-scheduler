import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * DTO for patient registration
 */

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Length(10, 100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 250)
  password: string;

  constructor({
    username,
    firstName,
    lastName,
    email,
    password,
  }: Record<string, string>) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

/**
 * DTO for patient login
 */

export class LoginDto {}
