import { Injectable, Inject } from '@nestjs/common';
import { EventEntity } from './entity/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UserEntity } from '../user/entity/user.entity';
import { MessagesHelper } from '../helpers/messages.helper';
import { IResponseUserToEvent } from '../helpers/types/IResponseUser';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // @InjectRepository(UserEntity) // private readonly userService: UserService,
  ) {}

  async findAll() {
    return await this.eventRepository.find({
      order: { createdAt: 'DESC' },
      relations: { users: true },
    });
  }

  async findOne(id: string) {
    try {
      return await this.eventRepository.findOneOrFail({
        where: { id },
        relations: {
          users: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateEventDto) {
    return await this.eventRepository.save(this.eventRepository.create(data));
  }

  async update(id: string, data: UpdateEventDto) {
    const event = await this.findOne(id);
    event.users = data.users;
    this.eventRepository.merge(event, data);
    return await this.eventRepository.save(event);
  }

  async deleteById(id: string) {
    await this.findOne(id);
    await this.eventRepository.softDelete(id);
  }

  async putUserToEvent(
    userId: string,
    eventId: string,
  ): Promise<IResponseUserToEvent> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      return {
        message: MessagesHelper.ERROR_404_MSG_USER_EVENT,
        response: false,
        statusCode: 404,
      };
    }
    const response: IResponseUserToEvent = await this.findOne(eventId)
      .then(async (res) => {
        if (res.users && res.users.find((user) => user.id === userId)) {
          return {
            message: MessagesHelper.USER_ALREADY_EVENT,
            response: false,
            statusCode: 404,
          } as IResponseUserToEvent;
        }

        if (res.users) {
          res.users.push(new UserEntity({ id: userId }));
        } else {
          res.users = [new UserEntity({ id: userId })];
        }
        await this.update(eventId, res);
        return {
          message: `O usuario ${user.firstName} ${user.lastName} cadastrado com sucesso no evento ${res.name}`,
          response: true,
          statusCode: 201,
        } as IResponseUserToEvent;
      })
      .catch(() => {
        return {
          message: MessagesHelper.ERROR_404_MSG_USER_EVENT,
          response: false,
          statusCode: 404,
        } as IResponseUserToEvent;
      });
    return response;
  }

  async removeUserToEvent(
    userId: string,
    eventId: string,
  ): Promise<IResponseUserToEvent> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      return {
        message: MessagesHelper.ERROR_404_MSG_USER_EVENT,
        response: false,
        statusCode: 404,
      };
    }

    const response: IResponseUserToEvent = await this.findOne(eventId)
      .then(async (res) => {
        if (res.users && res.users.length === 0) {
          if (res.users.find((user) => user.id !== userId)) {
            return {
              message: MessagesHelper.USER_NOT_IN_EVENT,
              response: false,
              statusCode: 404,
            } as IResponseUserToEvent;
          }
          return {
            message: MessagesHelper.USER_NOT_IN_EVENT,
            response: false,
            statusCode: 404,
          } as IResponseUserToEvent;
        } else {
        }
        if (res.users) {
          res.users = res.users.filter((user) => user.id !== userId);
        } else {
          res.users = [];
        }
        await this.update(eventId, res);
        return {
          message: `O usuario ${user.firstName} ${user.lastName} removido com sucesso no evento ${res.name}`,
          response: true,
          statusCode: 201,
        } as IResponseUserToEvent;
      })
      .catch(() => {
        return {
          message: MessagesHelper.ERROR_404_MSG_USER_EVENT,
          response: false,
          statusCode: 404,
        } as IResponseUserToEvent;
      });
    return response;
  }
}
