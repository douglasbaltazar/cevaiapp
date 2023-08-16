"use client";

import SignIn from "@/app/components/SignIn";
import SignUp from "@/app/components/SignUp";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Login() {
    const [loginFormSelected, setLoginFormSelected] = useState(true);
    return (
        <Box
            sx={{
                minHeight: "60vh",
                marginBottom: 2,
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
        </Box>
    );
}
