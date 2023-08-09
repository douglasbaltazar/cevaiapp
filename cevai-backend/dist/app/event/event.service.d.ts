import { EventEntity } from './entity/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventService {
    private readonly eventRepository;
    constructor(eventRepository: Repository<EventEntity>);
    findAll(): Promise<EventEntity[]>;
    findOne(id: string): Promise<EventEntity>;
    create(data: CreateEventDto): Promise<EventEntity>;
    update(id: string, data: UpdateEventDto): Promise<EventEntity>;
    deleteById(id: string): Promise<void>;
}
