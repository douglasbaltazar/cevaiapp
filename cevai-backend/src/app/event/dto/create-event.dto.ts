import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsIn } from 'class-validator';
import { MessageHelperFn } from '../../../app/helpers/messages.helper';
import { UserEntity } from 'src/app/user/entity/user.entity';

export class CreateEventDto {
  @IsNotEmpty({ message: MessageHelperFn('name') })
  @ApiProperty()
  name: string;
  @IsNotEmpty({ message: MessageHelperFn('bands') })
  @ApiProperty()
  bands: string;
  @IsNotEmpty({ message: MessageHelperFn('status') })
  @IsIn([0, 1])
  @ApiPropertyOptional()
  status: number;
}
