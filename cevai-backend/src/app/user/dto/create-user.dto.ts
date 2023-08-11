import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsIn, IsEmail, Matches } from 'class-validator';
import { RegexHelper } from '../../../app/helpers/regex.helper';
import {
  MessageHelperFn,
  MessagesHelper,
} from '../../../app/helpers/messages.helper';

export class CreateUserDto {
  @IsNotEmpty({ message: MessageHelperFn('firstName') })
  @ApiProperty()
  firstName: string;
  @IsNotEmpty({ message: MessageHelperFn('lastName') })
  @ApiProperty()
  lastName: string;
  @IsNotEmpty({ message: MessageHelperFn('email') })
  @IsEmail({}, { message: MessagesHelper.EMAIL_INVALID })
  @ApiProperty()
  email: string;
  @IsNotEmpty({ message: MessageHelperFn('gender') })
  @ApiProperty()
  gender: string;
  @IsNotEmpty({ message: MessageHelperFn('password') })
  @Matches(RegexHelper.passwordRegex, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  @ApiProperty()
  password: string;
  @IsNotEmpty({ message: MessageHelperFn('status') })
  @IsIn([0, 1])
  @ApiProperty()
  status: number;
}
