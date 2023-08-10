import { Grid, Container, Box } from "@mui/material";
import Navbar from "../../components/Navbar";
import SignIn from "../../components/SignIn";
import { useState } from "react";
import SignUp from "../../components/SignUp";

export default function Landing() {
    const [loginFormSelected, setLoginFormSelected] = useState(true);
    return (
        <Container
            maxWidth="xl"
            sx={{
                paddingTop: 10,
            }}
        >
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
                    {loginFormSelected ? (
                        <SignIn
                            handleLoginFormSelected={() =>
                                setLoginFormSelected(!loginFormSelected)
                            }
                        />
                    ) : (
                        <SignUp
                            handleLoginFormSelected={() =>
                                setLoginFormSelected(!loginFormSelected)
                            }
                        />
                    )}
                </Grid>
                <Grid item xs={4}>
                    <Box
                        component="img"
                        src="imgs/ceVaiLogoFull.png"
                        width={"450px"}
                        alt="CeVai Logo"
                    ></Box>
                </Grid>
            </Grid>
        </Container>
    );
}
