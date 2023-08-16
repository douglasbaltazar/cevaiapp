import { AuthContext } from "@/app/contexts/AuthContext";
import { putUserToEvent, removeUserToEvent } from "@/app/services/event";
import { IEvent } from "@/app/types/Event/IEvent";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box,
    Snackbar,
    CardActionArea,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";

type Props = {
    evento: IEvent;
};

export default function EventCard({ evento }: Props) {
    const context = useContext(AuthContext);
    const router = useRouter();
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    const [messageSnackBar, setMessageSnackBar] = useState<string>("");
    const { "cevaiapp.userId": id } = parseCookies();
    const handleClickGoToEvent = async () => {
        // console.log(
        //     ` O user ${context.user?.name} de id ${id} vai para a festa ${evento.name} (${evento.id})`
        // );
        await putUserToEvent(id, evento.id).then((res) => {
            if (res.status === "error") {
                setMessageSnackBar(res?.message);
                setOpenSnackBar(true);
            } else {
                setMessageSnackBar("Presença confirmada");
                setOpenSnackBar(true);
            }
        });
    };
    const handleClickNotGoToEvent = async () => {
        await removeUserToEvent(id, evento.id).then((res) => {
            if (res.status === "error") {
                setMessageSnackBar(res?.message);
                setOpenSnackBar(true);
            } else {
                setMessageSnackBar("Presença removida");
                setOpenSnackBar(true);
            }
        });
    };
    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <Snackbar
                color="error"
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
                open={openSnackBar}
                onClose={handleCloseSnackBar}
                // TransitionComponent={<Slide direction="up" />}
                message={messageSnackBar}
                autoHideDuration={2000}
            />
            <CardActionArea onClick={() => router.push(`/event/${evento.id}`)}>
                <CardMedia
                    sx={{ height: 140, objectFit: "fill" }}
                    image="/imgs/bg.jpg"
                    title={evento.name}
                />
                <CardContent
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {evento.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {evento.bands}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {context?.user?.name && (
                <CardActions>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "1rem",
                            width: "100vw",
                            justifyItems: "center",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => handleClickGoToEvent()}
                        >
                            Vou
                        </Button>
                        <Button
                            size="small"
                            color="warning"
                            onClick={() => router.push(`/event/${evento.id}`)}
                        >
                            Quem vai?
                        </Button>
                        <Button
                            size="small"
                            color="error"
                            onClick={() => handleClickNotGoToEvent()}
                        >
                            Não vou
                        </Button>
                    </Box>
                </CardActions>
            )}
        </Card>
    );
}
