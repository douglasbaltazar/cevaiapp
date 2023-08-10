import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";

type Props = {
    handleLoginFormSelected: () => void;
};

export default function SignIn({ handleLoginFormSelected }: Props) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get("email"),
        //     password: data.get("password"),
        // });
        const form = {
            email: data.get("email"),
            password: data.get("password"),
        };
        axios.post("http://localhost:3000/api/auth/login", form).then((res) => {
            localStorage.setItem("token", res.data.token);
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LoginIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Fazer Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Avançar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Esqueceu sua senha?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                sx={{ cursor: "pointer" }}
                                variant="body2"
                                onClick={() => handleLoginFormSelected()}
                            >
                                {"Não tem uma conta?"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
