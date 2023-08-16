"use client";

import { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Link,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { TypeOf, object, string } from "zod";
import EventIcon from "@mui/icons-material/Event";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema } from "@/app/schemas/createEventSchema";
import { ICreateEvent, IEvent } from "@/app/types/Event/IEvent";
import { createNewEvent } from "@/app/services/event";
import { useRouter } from "next/navigation";

export default function Page() {
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    const [messageSnackBar, setMessageSnackBar] = useState<string>("");
    const router = useRouter();
    type CreateEventInput = TypeOf<typeof createEventSchema>;

    const methods = useForm<CreateEventInput>({
        resolver: zodResolver(createEventSchema),
    });

    const {
        reset,
        handleSubmit,
        register,
        formState: { isSubmitSuccessful, errors },
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            // setGender("");
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmitHandler: SubmitHandler<CreateEventInput> = async (
        values: ICreateEvent
    ) => {
        values.status = 0;
        await createNewEvent(values)
            .then((resp: IEvent) => {
                setMessageSnackBar(`Evento ${resp.name} criado com sucesso.`);
                setOpenSnackBar(true);
                setTimeout(() => {
                    router.push("/feed");
                }, 2000);
            })
            .catch(() => {
                setMessageSnackBar(`Erro ao criar o evento ${values.name}`);
                setOpenSnackBar(true);
            });
    };

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    };
    return (
        <Container component="main" maxWidth="xs" sx={{
          height: '60vh'
        }}>
            <Snackbar
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
                open={openSnackBar}
                onClose={handleCloseSnackBar}
                // TransitionComponent={<Slide direction="up" />}
                message={messageSnackBar}
                autoHideDuration={2000}
            />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <EventIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cadastre um novo evento
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmitHandler)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nome do Evento"
                        autoFocus
                        error={!!errors["name"]}
                        helperText={
                            errors["name"] ? errors["name"].message : ""
                        }
                        {...register("name")}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="bands"
                        label="Atrações"
                        error={!!errors["bands"]}
                        helperText={
                            errors["bands"] ? errors["bands"].message : ""
                        }
                        {...register("bands")}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
