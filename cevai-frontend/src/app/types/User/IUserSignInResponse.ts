export interface IUserSignInResponse {
    token: string;
    user: IUserSignInResponseUser;
    status: string;
    error?: string;
}

interface IUserSignInResponseUser {
    name: string;
    id: string;
    email: string;
}
