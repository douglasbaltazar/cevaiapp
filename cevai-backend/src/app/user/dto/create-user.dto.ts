import { IsNotEmpty, IsIn, IsEmail, Matches } from 'class-validator';
import {
  MessageHelperFn,
  MessagesHelper,
} from 'src/app/helpers/messages.helper';
import { RegexHelper } from 'src/app/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty({ message: MessageHelperFn('firstName') })
  firstName: string;
  @IsNotEmpty({ message: MessageHelperFn('lastName') })
  lastName: string;
  @IsNotEmpty({ message: MessageHelperFn('email') })
  @IsEmail({}, { message: MessagesHelper.EMAIL_INVALID })
  email: string;
  @IsNotEmpty({ message: MessageHelperFn('gender') })
  gender: string;
  @IsNotEmpty({ message: MessageHelperFn('password') })
  @Matches(RegexHelper.passwordRegex, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;
  @IsNotEmpty({ message: MessageHelperFn('status') })
  @IsIn([0, 1])
  status: number;
}
