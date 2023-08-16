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
import ImageSource from "../../../../public/imgs/cevailogoblack.png";

function Navbar() {
    const context = React.useContext(AuthContext);
    const router = useRouter();
    const [isLoged, setIsLoged] = React.useState<boolean>(true);

    const handleClickLogout = () => {
        destroyCookie(undefined, "cevaiapp.token");
        destroyCookie(undefined, "cevaiapp.userId");
        context.user = null;
        setIsLoged(false);
        router.push("/");
    };
    React.useEffect(() => {
        setIsLoged(true);
    }, [context]);

    return (
        <AppBar position="static" color="inherit">
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "6rem",
                    }}
                >
                    <Box
                        component={Link}
                        href={context?.user?.name && isLoged ? "/feed" : "/"}
                        sx={{
                            cursor: "pointer",
                        }}
                    >
                        <Box
                            component="img"
                            src={`${ImageSource.src}`}
                            alt="CeVaiLogo"
                            height={"50px"}
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
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {context?.user?.name && isLoged ? (
                        <Tooltip title="github.com/douglasbaltazar/cevaiapp">
                            <Button
                                variant="contained"
                                color="inherit"
                                sx={{
                                    padding: 1,
                                    color: "black",
                                }}
                                onClick={() => handleClickLogout()}
                            >
                                <LogoutIcon sx={{ color: "blue" }} />
                                Fazer Logout
                            </Button>
                        </Tooltip>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                gap: "1rem",
                            }}
                        >
                            <Button
                                variant="text"
                                sx={{
                                    color: "black",
                                    "&:hover": {
                                        color: "red",
                                    },
                                }}
                                onClick={() => router.push("/")}
                            >
                                Eventos
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    color: "black",
                                    "&:hover": {
                                        color: "red",
                                        borderColor: "red",
                                        transition: "0.5s",
                                        boxShadow:
                                            "0px 0px 0px 0px rgba(0,0,0,0.3)",
                                        backgroundColor: "#ebeff0",
                                    },
                                    padding: 2,
                                    borderRadius: "10px",
                                    borderColor: "black",
                                    border: "1px solid transparent",
                                    boxShadow:
                                        "0px 0px 0px 1px rgba(0,0,0,0.3)",
                                }}
                                onClick={() => router.push("/login")}
                            >
                                Conta
                            </Button>
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
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
