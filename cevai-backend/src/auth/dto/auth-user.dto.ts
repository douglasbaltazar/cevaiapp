import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import {
  MessageHelperFn,
  MessagesHelper,
} from 'src/app/helpers/messages.helper';
import { RegexHelper } from 'src/app/helpers/regex.helper';

export class AuthUserDto {
  id: string;

  @IsNotEmpty({ message: MessageHelperFn('email') })
  @IsEmail({}, { message: MessagesHelper.EMAIL_INVALID })
  @ApiProperty()
  email: string;
  @IsNotEmpty({ message: MessageHelperFn('password') })
  @Matches(RegexHelper.passwordRegex, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  @ApiProperty()
  password: string;
}
