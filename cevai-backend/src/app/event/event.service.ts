import { Injectable } from '@nestjs/common';
import { EventEntity } from './entity/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async findAll() {
    return await this.eventRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.eventRepository.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data) {
    return await this.eventRepository.save(this.eventRepository.create(data));
  }
  async update(id: string, data) {
    const event = await this.findOne(id);
    this.eventRepository.merge(event, data);
    return await this.eventRepository.save(event);
  }
  async deleteById(id: string) {
    await this.findOne(id);
    await this.eventRepository.softDelete(id);
  }
}
