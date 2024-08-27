import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

function combineDecorators(...decorators: PropertyDecorator[]) {
  return function (target: any, propertyKey: string | symbol) {
    decorators.forEach((decorator) => decorator(target, propertyKey));
  };
}

export const UsernameValidation = () =>
  combineDecorators(
    IsNotEmpty({ message: 'Username cannot be empty' }),
    IsString({ message: 'Username must be of string type' }),
    MinLength(5, { message: 'Min length is 5' }),
    MaxLength(50, { message: 'Max length is 50' }),
  );

export const FirstNameValidation = () =>
  combineDecorators(
    IsNotEmpty({ message: 'First name cannot be empty' }),
    IsString({ message: 'First name must be of string type' }),
    MinLength(5, { message: 'Min length is 5' }),
    MaxLength(50, { message: 'Max length is 50' }),
  );

export const LastNameValidation = () =>
  combineDecorators(
    IsNotEmpty({ message: 'Last name cannot be empty' }),
    IsString({ message: 'Last name must be of string type' }),
    MinLength(5, { message: 'Min length is 5' }),
    MaxLength(50, { message: 'Max length is 50' }),
  );

export const EmailValidation = () =>
  combineDecorators(
    IsEmail({}, { message: 'Invalid email format' }),
    IsNotEmpty({ message: 'Email cannot be empty' }),
    IsString({ message: 'Email must be of string type' }),
    MinLength(10, { message: 'Min length is 10' }),
    MaxLength(100, { message: 'Max length is 100' }),
  );

export const PasswordValidation = () =>
  combineDecorators(
    IsNotEmpty({ message: 'Password cannot be empty' }),
    IsString({ message: 'Password must be of string type' }),
    MinLength(5, { message: 'Min length is 5' }),
    MaxLength(250, { message: 'Max length is 250' }),
  );
