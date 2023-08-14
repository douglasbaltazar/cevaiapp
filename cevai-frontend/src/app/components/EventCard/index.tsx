import { AuthContext } from "@/app/contexts/AuthContext";
import { IEvent } from "@/app/types/Event/IEvent";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";
import { useContext } from "react";

type Props = {
    evento: IEvent;
};

export default function EventCard({ evento }: Props) {
    const context = useContext(AuthContext);
    return (
        <Card sx={{ maxWidth: 345, p: 2 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/imgs/bg.jpg"
                title={evento.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {evento.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {evento.bands}
                </Typography>
            </CardContent>
            {context?.user?.name && (
                <CardActions>
                    <Button size="small">Vou</Button>
                    <Button size="small">Não vou</Button>
                </CardActions>
            )}
        </Card>
    );
}
