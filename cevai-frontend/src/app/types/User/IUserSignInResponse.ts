export interface IUserSignInResponse {
    token: string;
    user: IUserSignInResponseUser;
}

interface IUserSignInResponseUser {
    name: string;
    id: string;
    email: string;
}
