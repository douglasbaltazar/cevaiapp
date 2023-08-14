import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import { AuthContext } from "@/app/contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

function Navbar() {
    const context = React.useContext(AuthContext);
    const router = useRouter();
    const [isLoged, setIsLoged] = React.useState<boolean>(true);

    const handleClickLogout = () => {
        console.log("logout");
        destroyCookie(undefined, "cevaiapp.token");
        destroyCookie(undefined, "cevaiapp.userId");
        console.log(context.user);
        context.user = null;
        console.log(context.user);
        setIsLoged(false);
        router.push("/");
    };
    React.useEffect(() => {
        setIsLoged(true);
    }, [context])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        src="imgs/cevailogowhite.png"
                        alt="CeVaiLogo"
                        height={"35px"}
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    ></Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {context?.user?.name && isLoged ? (
                        <Tooltip title="github.com/douglasbaltazar/cevaiapp">
                            <Button
                                variant="contained"
                                color="inherit"
                                sx={{
                                    padding: 1,
                                    color: "blue",
                                }}
                                onClick={() => handleClickLogout()}
                            >
                                <LogoutIcon sx={{ color: "blue" }} />
                                Fazer Logout
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip title="github.com/douglasbaltazar/cevaiapp">
                            <Box
                                component={Link}
                                href={
                                    "http://github.com/douglasbaltazar/cevaiapp"
                                }
                                sx={{
                                    p: 0,
                                    textDecoration: "none",
                                    display: "flex",
                                }}
                            >
                                <Button variant="contained" color="info">
                                    <GitHubIcon
                                        sx={{
                                            color: "white",
                                        }}
                                    />
                                    Visitar GitHub
                                </Button>
                            </Box>
                        </Tooltip>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
