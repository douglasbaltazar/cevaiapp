import { ICreateEvent, IEvent } from "../types/Event/IEvent";
import { api } from "./api";

export async function putUserToEvent(userId: string, eventId: string) {
    return api
        .post(`http://localhost:3000/api/v1/events/${eventId}/${userId}`)
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            return response?.data;
        });
}

export async function removeUserToEvent(userId: string, eventId: string) {
    return api
        .delete(`http://localhost:3000/api/v1/events/${eventId}/${userId}`)
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            return response?.data;
        });
}

export async function getEventDetail(eventId: string) {
    return await api
        .get(`/api/v1/events/${eventId}`)
        .then(({ data }) => {
            console.log("aqui2", data);
            return data;
        })
        .catch((e) => {
            // console.log("3");
            return null;
        });
}

export async function createNewEvent(evento: ICreateEvent) {
    return await api
        .post("/api/v1/events", evento)
        .then(({ data }) => {
            console.log(data);
            return data;
        })
        .catch((e) => {
            console.log(e);
            return null;
        });
}
