import {IsNotEmpty, IsEmail, MinLength, Matches} from 'class-validator'
export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8, {
    message: 'password must be at least 8 characters long',
  })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])/, {
    message:
      'password must contain a lowercase, uppercase, number, and special character (exclude white space)',
  })
  password: string
}
