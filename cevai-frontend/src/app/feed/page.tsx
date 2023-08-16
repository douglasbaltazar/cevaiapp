"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { parseCookies } from "nookies";
import { getAPIClient } from "@/app/services/axios";
import { useRouter } from "next/navigation";
import {
    Container,
    Typography,
    Box,
    Input,
    InputAdornment,
} from "@mui/material";
import { IEvent } from "../types/Event/IEvent";
import EventCard from "../components/EventCard";
import SearchIcon from "@mui/icons-material/Search";

export default function Page() {
    const router = useRouter();
    const apiClient = getAPIClient();
    const { ["cevaiapp.token"]: token } = parseCookies();
    const [events, setEvents] = useState<IEvent[]>();
    const [eventsDefaults, setEventsDefaults] = useState<IEvent[]>();

    useEffect(() => {
        async function test() {
            setEvents((await apiClient.get("/api/v1/events")).data);
            setEventsDefaults((await apiClient.get("/api/v1/events")).data);
        }
        test();
    }, []);

    const handleSearchByBandOrName = (search: string) => {
        // console.log();
        // console.log("search", search);
        // console.log(events?.filter((event) => event.name.includes(search)));
        setEvents(
            eventsDefaults?.filter(
                (event) =>
                    event.name.toLowerCase().includes(search.toLowerCase()) ||
                    event.bands.toLowerCase().includes(search.toLowerCase())
            )
        );
        if (search === "") {
            setEvents(eventsDefaults);
        }
    };

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
                <Input
                    placeholder="Digite por banda ou nome do evento"
                    sx={{
                        width: "30vw",
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    onChange={(e) => handleSearchByBandOrName(e.target.value)}
                    // onChange={() => }
                ></Input>
                {events && events?.length > 0 ? (
                    events?.map((evento: IEvent) => (
                        <Box sx={{ padding: 2 }} key={evento.id}>
                            <EventCard evento={evento} />
                        </Box>
                    ))
                ) : (
                    <Typography
                        variant="h6"
                        sx={{
                            padding: 2,
                        }}
                    >
                        Não existem eventos cadastrados com esse nome e/ou banda
                    </Typography>
                )}
            </Box>
        </Container>
    );
}
