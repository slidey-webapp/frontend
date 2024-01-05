export interface AuthUser {
    claims: string[];
    user: User;
    token: string;
    refreshToken: string;
}

export interface Account {
    accountID: number;
    email: string;
    status: 'UNVERIFIED' | 'ACTIVE';
}

export interface Person {
    fullName: string;
}

export interface User extends Account, Person {}

export interface LoginParam {
    email: string;
    password: string;
    rememberMe: boolean;
}

export type LoginType = 'login' | 'google-login';

export interface SignUpParam {
    password: string;
    email: string;
    fullname: string;
    confirmPassword: string;
}

export type VerifyAccountParam = {
    accountID?: string;
    token?: string;
};

export type ResetPasswordParam = {
    accountID?: string;
    token?: string;
};

export interface ChangePasswordParam {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
}