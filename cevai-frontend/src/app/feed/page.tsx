"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { parseCookies } from "nookies";
import { getAPIClient } from "@/app/services/axios";
import { useRouter } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";
import { IEvent } from "../types/Event/IEvent";
import EventCard from "../components/EventCard";

export default function Page() {
    const router = useRouter();
    const apiClient = getAPIClient();
    const { ["cevaiapp.token"]: token } = parseCookies();
    const [events, setEvents] = useState<IEvent[]>();
    useEffect(() => {
        async function test() {
            setEvents((await apiClient.get("/api/v1/events")).data);
        }
        test();
    }, []);

    console.log(events);

    if (!token) {
        router.push("/");
    }
    const { user } = useContext(AuthContext);
    return (
        <Container
            maxWidth="lg"
            sx={{
                paddingTop: 2,
            }}
        >
            <Typography variant="h6">Bem vindo, {user?.name}</Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                {events?.map((evento: IEvent) => (
                    <Box sx={{ padding: 2 }} key={evento.id}>
                        <EventCard evento={evento} />
                    </Box>
                ))}
            </Box>
        </Container>
    );
}
