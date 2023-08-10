import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import CreateIcon from "@mui/icons-material/Create";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";

type Props = {
    handleLoginFormSelected: () => void;
};

export default function SignUp({ handleLoginFormSelected }: Props) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            first_name: data.get("first_name"),
            last_name: data.get("last_name"),
            email: data.get("email"),
            password: data.get("password"),
            confirm_password: data.get("confirm_password"),
            gender,
        });
    };

    const [gender, setGender] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
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
                    <CreateIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registre-se
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
                        id="first_name"
                        label="Primeiro Nome"
                        name="first_name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="last_name"
                        label="Ultimo Nome"
                        name="last_name"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirm_password"
                        label="Confirme sua Senha"
                        type="password"
                        id="confirm_password"
                        autoComplete="current-password"
                    />
                    <FormControl fullWidth required margin="normal">
                        <InputLabel>Genero</InputLabel>
                        <Select
                            value={gender}
                            label="Genero"
                            onChange={handleChange}
                        >
                            <MenuItem value={"Masculino"}>Masculino</MenuItem>
                            <MenuItem value={"Feminino"}>Feminino</MenuItem>
                            <MenuItem value={"Outro"}>Não Definido</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Cadastrar
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link
                                sx={{ cursor: "pointer" }}
                                variant="body2"
                                onClick={() => handleLoginFormSelected()}
                            >
                                {"Já tem uma conta? Faça Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
