import { AxiosResponse } from "axios";
import { IUserSignIn } from "../types/User/IUserSignIn";
import { IUserSignInResponse } from "../types/User/IUserSignInResponse";
import { api } from "./api";
import { IUserSignUp } from "../types/User/IUserSignUp";
import { IUserSignUpResponse } from "../types/User/IUserSignUpResponse";

export async function SignInRequest(
    data: IUserSignIn
): Promise<IUserSignInResponse> {
    return api
        .post("http://localhost:3000/api/auth/login", data)
        .then(({ data }: AxiosResponse<IUserSignInResponse>) => {
            return {
                token: data.token,
                user: data.user,
                status: "success",
            } as IUserSignInResponse;
            // localStorage.setItem("token", res.data.token);
        })
        .catch((e) => {
            return {
                token: "",
                user: {},
                status: "error",
                error: e.response.data.message,
            } as IUserSignInResponse;
        });
}

export async function SignUpRequest(data: IUserSignUp) {
    const { email, password } = data;
    return api
        .post("http://localhost:3000/api/v1/users", data)
        .then(({ data }: AxiosResponse<IUserSignUpResponse>) => {
            // SignInRequest({ email, password } as IUserSignIn);
            return {
                user: data,
            };
        });
}

export async function recoverUserInformation(id: string) {
    return api
        .get(`http://localhost:3000/api/v1/users/${id}`)
        .then(({ data }) => {
            return {
                user: {
                    name: `${data?.firstName} ${data?.lastName}`,
                    email: `${data?.email}`,
                },
            };
        })
        .catch((e) => {
            console.log("Deu bode ", e);
        });
}
