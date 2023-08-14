import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import {
    Facebook,
    GitHub,
    Instagram,
    LinkedIn,
    Twitter,
} from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 6,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            gutterBottom
                        >
                            Sobre o projeto
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            O projeto é um antigo pensamento meu e de um grande
                            amigo, no qual em 2010 tivemos essa ideia, mas nunca
                            colocamos em pratica. O CeVai é um inicio de uma
                            melhoria no meu portfolio, e será usado como forma
                            de estudos, tanto para novas tecnologias, como novas
                            formas de Deploy.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            gutterBottom
                        >
                            Contato
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: douglasbaltazar1@gmail.com
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            gutterBottom
                        >
                            Redes Sociais
                        </Typography>
                        <Link
                            href="https://www.linkedin.com/in/douglasbaltazar1/"
                            sx={{
                                color: "inherit",
                                "&:hover": {
                                    color: "red",
                                    transition: ".4s",
                                },
                            }}
                        >
                            <LinkedIn />
                        </Link>
                        <Link
                            href="https://github.com/douglasbaltazar"
                            color="inherit"
                            sx={{
                                pl: 1,
                                pr: 1,
                                color: "inherit",
                                "&:hover": {
                                    color: "red",
                                    transition: ".4s",
                                },
                            }}
                        >
                            <GitHub />
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                    >
                        {"Copyright © "}
                        <Link
                            color="inherit"
                            href="https://www.linkedin.com/in/douglasbaltazar1/"
                        >
                            Douglas Baltazar
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
