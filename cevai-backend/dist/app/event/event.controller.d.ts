import { EventService } from './event.service';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    index(): Promise<import("./entity/event.entity").EventEntity[]>;
    create(body: any): Promise<import("./entity/event.entity").EventEntity[]>;
    show(id: string): Promise<import("./entity/event.entity").EventEntity>;
    update(id: string, body: any): Promise<import("./entity/event.entity").EventEntity>;
    destroy(id: string): Promise<void>;
}
