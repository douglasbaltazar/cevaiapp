"use client";

import SignIn from "@/app/components/SignIn";
import SignUp from "@/app/components/SignUp";
import { useState } from "react";

export default function Login() {
    const [loginFormSelected, setLoginFormSelected] = useState(true);
    return (
        <>
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
        </>
    );
}
