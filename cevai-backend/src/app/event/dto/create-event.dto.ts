import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsIn } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  bands: string;
  @IsNotEmpty()
  @IsIn([0, 1])
  @ApiPropertyOptional()
  status: number;
}
