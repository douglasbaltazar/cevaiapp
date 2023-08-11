import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { EventEntity } from 'src/app/event/entity/event.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ name: 'first_name' })
  @ApiProperty()
  firstName: string;

  @Column({ name: 'last_name' })
  @ApiProperty()
  lastName: string;

  @PrimaryColumn()
  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ type: 'tinyint', width: 1 })
  @ApiProperty()
  status: number;

  @Column()
  @ApiProperty()
  gender: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @ManyToMany(() => EventEntity, (evento) => evento.users)
  @JoinTable({
    name: 'users_events',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'event_id',
      referencedColumnName: 'id',
    },
  })
  events: EventEntity[];
}
