import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

const STRONG_PASSWORD_REGEX =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const EMAIL_VALIDATION_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @Matches(EMAIL_VALIDATION_REGEX, { message: 'Email is not valid' })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(STRONG_PASSWORD_REGEX, { message: 'password is too weak' })
  password: string;
}
