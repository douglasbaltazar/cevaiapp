"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { api } from "@/app/services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { getAPIClient } from "@/app/services/axios";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const apiClient = getAPIClient();
    const { ["cevaiapp.token"]: token } = parseCookies();
    useEffect(() => {
        async function test() {
            await apiClient.get("/api/v1/users");
        }
        test();
    }, []);

    if (!token) {
        router.push("/");
    }
    const { user } = useContext(AuthContext);
    return <h1>Dashboard</h1>;
}
