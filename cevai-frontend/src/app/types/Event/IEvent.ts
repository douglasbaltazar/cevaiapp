export interface IEvent {
    id: string;
    name: string;
    bands: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface IEventsList {
    events: IEvent[];
}
