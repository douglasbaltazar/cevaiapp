import { ApiProperty } from '@nestjs/swagger';

export class AuthUserEntity {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
