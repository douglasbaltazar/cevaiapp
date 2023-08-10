import { IEvent } from "@/app/types/Event/IEvent";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";

type Props = {
  evento: IEvent;
}

export default function EventCard({evento}: Props) {
    return (
        <Card sx={{ maxWidth: 345, p: 2 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {evento.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {evento.bands}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Vou</Button>
                <Button size="small">Não vou</Button>
            </CardActions>
        </Card>
    );
}
