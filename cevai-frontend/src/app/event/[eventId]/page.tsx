"use client";
import { getEventDetail } from "@/app/services/event";
import {
    Avatar,
    Box,
    Button,
    Container,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IEvent } from "../../types/Event/IEvent";
import ImageBg from "../../../../public/imgs/bg.jpg";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface Props {
    params: { eventId: string };
}

export default function Event({ params }: Props) {
    const [event, setEvent] = useState<IEvent>();
    const router = useRouter();
    useEffect(() => {
        async function getEventDetailed() {
            await getEventDetail(params.eventId).then((resp) => {
                console.log(params.eventId);
                console.log("response ==> ", resp);
                setEvent(resp);
                return resp;
            });
        }
        getEventDetailed();
    }, []);
    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    }
    return (
        <Container
            maxWidth="lg"
            sx={{
                marginTop: 3,
                height: "90vh",
            }}
        >
            <Box>
                <Button onClick={() => router.push("/feed")}>
                    <ArrowBackIos />
                    Voltar
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginTop: 2,
                }}
            >
                <Box
                    component={"img"}
                    src={ImageBg.src}
                    sx={{
                        borderRadius: "20px",
                        width: "800px",
                        height: "300px",
                    }}
                    alt={event?.name}
                ></Box>
                <Typography
                    variant="h4"
                    sx={{
                        marginTop: 2,
                    }}
                >
                    {event?.name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 4,
                    }}
                >
                    Informações
                </Typography>
                <Box
                    sx={{
                        marginTop: 4,
                        padding: 1,
                    }}
                >
                    <Typography variant="body1">
                        <strong>Bandas:</strong> {event?.bands}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Status:</strong>{" "}
                        {event?.status === 0 ? "Em preparação" : "Concluido"}
                    </Typography>
                    <Box
                        sx={{
                            marginTop: 12,
                        }}
                    >
                        <Typography variant="h6">
                            Pessoas que já estão confirmadas
                        </Typography>
                        <Box
                            sx={{
                                marginTop: 2,
                            }}
                        >
                            {event?.users?.map((user) => (
                                <Tooltip
                                    key={user.id}
                                    title={`${user.firstName} ${user.lastName}`}
                                >
                                    <Avatar
                                        key={user.id}
                                        {...stringAvatar(
                                            `${user.firstName} ${user.lastName}`
                                        )}
                                    />
                                </Tooltip>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
