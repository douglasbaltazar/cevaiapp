import { UserEntity } from 'src/app/user/entity/user.entity';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends CreateEventDto {
  users?: UserEntity[];
}
