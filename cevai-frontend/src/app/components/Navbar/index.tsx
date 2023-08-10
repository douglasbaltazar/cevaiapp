import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { handleWebpackExternalForEdgeRuntime } from "next/dist/build/webpack/plugins/middleware-plugin";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import { AuthContext } from "@/app/contexts/AuthContext";

function Navbar() {
    const context = React.useContext(AuthContext);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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

                    <Tooltip title="github.com/douglasbaltazar/cevaiapp">
                        <Box
                            component={Link}
                            href={"http://github.com/douglasbaltazar/cevaiapp"}
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
                                Visitar GitHub {context.user?.name}
                            </Button>
                        </Box>
                    </Tooltip>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
