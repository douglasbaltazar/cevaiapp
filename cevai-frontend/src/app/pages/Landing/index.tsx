import { Grid, Container, Box, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import SignIn from "../../components/SignIn";
import { useState, useEffect } from "react";
import SignUp from "../../components/SignUp";
import { IEvent } from "@/app/types/Event/IEvent";
import { getAPIClient } from "@/app/services/axios";
import EventCard from "@/app/components/EventCard";
// import Image from 'imgs/bg.jpg'

export default function Landing() {
    const [loginFormSelected, setLoginFormSelected] = useState(true);
    const [events, setEvents] = useState<IEvent[]>();
    const apiClient = getAPIClient();
    useEffect(() => {
        async function test() {
            setEvents((await apiClient.get("/api/v1/events")).data);
        }
        test();
    }, []);
    return (
        <>
            <Box
                sx={{
                    width: "100vw",
                    height: "80vh",
                    backgroundImage: "url('imgs/bg2.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <Container
                    sx={{
                        paddingTop: 10,

                        width: "100vw",
                        height: "100vh",
                    }}
                >
                    {/* <Box sx={{}}>
                    <Typography variant="h6" sx={{
                        color: 'white',
                        fontWeight: '700',
                        
                    }}>#Destrua sua vida com coisas futeis</Typography>
                </Box> */}
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={1}
                            sx={{
                                height: "80vh",
                            }}
                        ></Grid>
                        <Grid
                            item
                            xs={6}
                            sx={{
                                height: "80vh",
                            }}
                        >
                            <Box
                                sx={{
                                    marginTop: 30,
                                    marginRight: 26,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "white",
                                        fontWeight: "700",
                                        fontSize: "30px",
                                        rowGap: "3px",
                                    }}
                                >
                                    #CêVai?
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "white",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        rowGap: "3px",
                                    }}
                                >
                                    Descubra um novo nível de emoção com nosso
                                    aplicativo revolucionário de eventos!
                                    <br />
                                    De conferências inspiradoras a festivais
                                    vibrantes e encontros sociais inesquecíveis,
                                    estamos aqui para conectar você aos eventos
                                    que importam.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                sx={{
                                    marginLeft: "10rem",
                                    marginTop: 30,
                                }}
                            >
                                <Box
                                    component="img"
                                    src="imgs/cevailogowhite.png"
                                    width={"450px"}
                                    alt="CeVai Logo"
                                ></Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box>
                <Container
                    sx={{
                        paddingTop: 10,
                    }}
                >
                    <Typography variant="h5">Próximos eventos</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {events?.map((evento: IEvent) => (
                            <Box sx={{ padding: 2 }} key={evento.id}>
                                <EventCard evento={evento} />
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>
        </>
    );
}
