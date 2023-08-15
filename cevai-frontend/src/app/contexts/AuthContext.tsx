import { useEffect } from "react";
import { createContext } from "react";
import {
    SignInRequest,
    SignUpRequest,
    recoverUserInformation,
} from "../services/auth";
import { setCookie, parseCookies } from "nookies";
import { useState } from "react";
import { IUserSignIn } from "../types/User/IUserSignIn";
import { IUser } from "../types/User/IUser";
import Router from "next/router";
import { api } from "../services/api";
import { useRouter } from "next/navigation";
import { IUserSignUp } from "../types/User/IUserSignUp";
import { IUserSignInResponse } from "../types/User/IUserSignInResponse";

type AuthContextType = {
    isAuthenticated: boolean;
    user: IUser | null;
    signIn: (data: IUserSignIn) => Promise<IUserSignInResponse>;
    signUp: (data: IUserSignUp) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const isAuthenticated = !!user;
    const router = useRouter();

    useEffect(() => {
        const { "cevaiapp.token": token2 } = parseCookies();
        const { "cevaiapp.userId": userId } = parseCookies();
        if (token2) {
            api.defaults.headers["Authorization"] = `Bearer ${token2}`;
            recoverUserInformation(userId).then((response) => {
                if (response) {
                    setUser(response?.user);
                }
            });
        }
    }, []);

    async function signIn({
        email,
        password,
    }: IUserSignIn): Promise<IUserSignInResponse> {
        const { token, user, status, error } = await SignInRequest({
            email,
            password,
        });

        setCookie(undefined, "cevaiapp.token", token, {
            maxAge: 60 * 60 * 24, // 1 dia
        });

        setCookie(undefined, "cevaiapp.userId", user.id, {
            maxAge: 60 * 60 * 24, // 1 dia
        });

        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        setUser(user);

        return {
            token,
            user,
            status,
            error,
        } as IUserSignInResponse;
    }
    async function signUp(data: IUserSignUp) {
        console.log(await SignUpRequest(data));
        const { email, password } = data;
        signIn({ email, password });
        // setCookie(undefined, "cevaiapp.")
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}
