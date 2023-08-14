import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

import { RegexHelper } from '../../../app/helpers/regex.helper';
import {
  MessageHelperFn,
  MessagesHelper,
} from '../../../app/helpers/messages.helper';

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
