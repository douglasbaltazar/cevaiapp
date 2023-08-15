import { useEffect, useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginIcon from "@mui/icons-material/Login";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegexHelper } from "@/app/utils/utils";
import { AuthContext } from "@/app/contexts/AuthContext";
import { Slide, Snackbar } from "@mui/material";

type Props = {
    handleLoginFormSelected: () => void;
};

export default function SignIn({ handleLoginFormSelected }: Props) {
    const { signIn } = useContext(AuthContext);
    const [openErrorSnackBar, setOpenErrorSnackBar] = useState<boolean>(false);
    const [errorMessageSnackBar, setErrorMessageSnackBar] =
        useState<string>("");
    const router = useRouter();

    const loginSchema = object({
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
    });
    type LoginInput = TypeOf<typeof loginSchema>;
    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
        const res = await signIn(values).then((resp) => {
            if (resp.status === "success") {
                router.push("/feed");
                reset();
            } else {
                setErrorMessageSnackBar("" + resp?.error);
                setOpenErrorSnackBar(true);
                reset();
            }
        });
    };

    const handleCloseErrorSnackBar = () => {
        setOpenErrorSnackBar(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                color="error"
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
                open={openErrorSnackBar}
                onClose={handleCloseErrorSnackBar}
                // TransitionComponent={<Slide direction="up" />}
                message={errorMessageSnackBar}
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
                    <LoginIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Fazer Login
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
                        id="email"
                        label="E-mail"
                        autoComplete="email"
                        // placeholder="Digite seu email"
                        autoFocus
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
                        // placeholder="Digite sua senha"
                        error={!!errors["password"]}
                        helperText={
                            errors["password"] ? errors["password"].message : ""
                        }
                        {...register("password")}
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
