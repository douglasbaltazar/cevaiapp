import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/app/user/entity/User.entity';

@Entity({ name: 'events' })
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  bands: string;

  @Column({ type: 'tinyint', width: 1 })
  @ApiProperty()
  status: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;

  @ManyToMany(() => UserEntity, (user) => user.events)
  @JoinTable({
    name: 'users_events',
    joinColumn: {
      name: 'event_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];
}
