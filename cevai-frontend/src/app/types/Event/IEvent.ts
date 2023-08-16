import { ICompleteUser } from "../User/IUser";

export interface IEvent {
    id: string;
    name: string;
    bands: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    users?: ICompleteUser[];
}

export interface IEventsList {
    events: IEvent[];
}
