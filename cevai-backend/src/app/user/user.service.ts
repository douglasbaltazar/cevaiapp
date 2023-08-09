import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/User.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'status', 'gender'],
    });
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateUserDto) {
    return await this.usersRepository.save(this.usersRepository.create(data));
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async deleteById(id: string) {
    await this.findOne(id);
    await this.usersRepository.softDelete(id);
  }
}
