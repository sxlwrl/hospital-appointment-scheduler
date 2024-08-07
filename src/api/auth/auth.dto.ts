import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO for patient registration
 */

export class RegisterDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @IsString({ message: 'Username must be of string type' })
  @MinLength(5, { message: 'Min length is 5' })
  @MaxLength(50, { message: 'Max length is 50' })
  username: string;

  @IsNotEmpty({ message: 'First name cannot be empty' })
  @IsString({ message: 'First name must be of string type' })
  @MinLength(5, { message: 'Min length is 5' })
  @MaxLength(50, { message: 'Max length is 50' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @IsString({ message: 'Last name must be of string type' })
  @MinLength(5, { message: 'Min length is 5' })
  @MaxLength(50, { message: 'Max length is 50' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString({ message: 'Email must be of string type' })
  @MinLength(10, { message: 'Min length is 1' })
  @MaxLength(100, { message: 'Max length is 100' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password must be of string type' })
  @MinLength(5, { message: 'Min length is 5' })
  @MaxLength(250, { message: 'Max length is 250' })
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

export class LoginDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @IsString({ message: 'Username must be of string type' })
  @MinLength(5, { message: 'Min length is 5' })
  @MaxLength(50, { message: 'Max length is 50' })
  username: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password must be of string type' })
  @MinLength(5, { message: 'Min length is 5' })
  @MaxLength(250, { message: 'Max length is 250' })
  password: string;

  constructor({ username, password }: Record<string, string>) {
    this.username = username;
    this.password = password;
  }
}
