export interface AuthUser {
    claims: string[];
    user: Account;
}

export interface Account {
    id: string;
    //todo: add more
}

export interface LoginParam {
    username: string;
    password: string;
    rememberMe: boolean;
}
