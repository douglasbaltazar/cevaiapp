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
