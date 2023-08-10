import { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegexHelper } from "@/app/utils/utils";
import axios from "axios";

import CreateIcon from "@mui/icons-material/Create";

import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { IUserSignUp } from "@/app/types/User/IUserSignUp";
import { AuthContext } from "@/app/contexts/AuthContext";

type Props = {
    handleLoginFormSelected: () => void;
};

export default function SignUp({ handleLoginFormSelected }: Props) {
    const { signUp } = useContext(AuthContext);
    const registerSchema = object({
        firstName: string()
            .nonempty("Nome é obrigatório")
            .max(40, "Nome muito longo"),
        lastName: string()
            .nonempty("Ultimo nome é obrigatório")
            .max(40, "Ultimo nome é obrigatório"),
        email: string()
            .nonempty("Email é obrigatório")
            .max(255, "O Email está muito longo")
            .email("O Email é inválido"),
        password: string()
            .nonempty("Senha é obrigatório")
            .min(8, "Senha deve ter no minimo 8 caracteres")
            .max(32, "Senha deve ter no máximo 32 caracteres")
            .regex(
                RegexHelper.passwordRegex,
                "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais."
            ),
        confirm_password: string()
            .min(8, "Senha deve ter no minimo 8 caracteres")
            .max(32, "Senha deve ter no máximo 32 caracteres")
            .regex(
                RegexHelper.passwordRegex,
                "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais."
            ),
        gender: string().nonempty("Genero é obrigatório"),
    }).refine((data) => data.password === data.confirm_password, {
        path: ["confirm_password"],
        message: "As senhas não conferem",
    });

    type RegisterInput = TypeOf<typeof registerSchema>;

    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
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
            setGender("");
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
        let valores = {
            status: 0,
            ...values,
        } as IUserSignUp;
        
        await signUp(valores);
        // axios.post("http://localhost:3000/api/v1/users", valores).then(() => {
        //     axios
        //         .post("http://localhost:3000/api/auth/login", {
        //             email: values.email,
        //             password: values.password,
        //         })
        //         .then((res) => {
        //             localStorage.setItem("token", res.data.token);
        //         });
        // });
    };

    const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
            confirm_password: data.get("confirm_password"),
            gender,
        });
    };

    const [gender, setGender] = useState("");

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
                    onSubmit={handleSubmit(onSubmitHandler)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="Primeiro Nome"
                        autoFocus
                        error={!!errors["firstName"]}
                        helperText={
                            errors["firstName"]
                                ? errors["firstName"].message
                                : ""
                        }
                        {...register("firstName")}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Ultimo Nome"
                        error={!!errors["lastName"]}
                        helperText={
                            errors["lastName"] ? errors["lastName"].message : ""
                        }
                        {...register("lastName")}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        error={!!errors["email"]}
                        helperText={
                            errors["email"] ? errors["email"].message : ""
                        }
                        {...register("email")}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!!errors["password"]}
                        helperText={
                            errors["password"] ? errors["password"].message : ""
                        }
                        {...register("password")}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirme sua Senha"
                        type="password"
                        id="confirm_password"
                        autoComplete="current-password"
                        error={!!errors["confirm_password"]}
                        helperText={
                            errors["confirm_password"]
                                ? errors["confirm_password"].message
                                : ""
                        }
                        {...register("confirm_password")}
                    />
                    <FormControl fullWidth required margin="normal">
                        <InputLabel>Genero</InputLabel>
                        <Select
                            value={gender}
                            label={"Genero"}
                            {...register("gender")}
                            onChange={handleChange}
                        >
                            <MenuItem value={""}></MenuItem>
                            <MenuItem value={"Masculino"}>Masculino</MenuItem>
                            <MenuItem value={"Feminino"}>Feminino</MenuItem>
                            <MenuItem value={"Outro"}>Não Definido</MenuItem>
                        </Select>
                        <FormHelperText error={!!errors["gender"]}>
                            {errors["gender"] ? errors["gender"].message : ""}
                        </FormHelperText>
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
