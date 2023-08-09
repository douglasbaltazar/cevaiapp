import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    index(): Promise<import("./entity/event.entity").EventEntity[]>;
    create(body: CreateEventDto): Promise<import("./entity/event.entity").EventEntity>;
    show(id: string): Promise<import("./entity/event.entity").EventEntity>;
    update(id: string, body: UpdateEventDto): Promise<import("./entity/event.entity").EventEntity>;
    destroy(id: string): Promise<void>;
}
