import { EventEntity } from './entity/event.entity';
import { Repository } from 'typeorm';
export declare class EventService {
    private readonly eventRepository;
    constructor(eventRepository: Repository<EventEntity>);
    findAll(): Promise<EventEntity[]>;
    findOne(id: string): Promise<EventEntity>;
    create(data: any): Promise<EventEntity[]>;
    update(id: string, data: any): Promise<EventEntity>;
    deleteById(id: string): Promise<void>;
}
