export interface AuthUser {
    claims: string[];
    user: User;
    token: string;
    refreshToken: string;
}

export type AccountStatus = 'UNVERIFIED' | 'ACTIVE' | 'INACTIVE';
export type AccountSource = 'normal' | 'google';

export interface Account {
    accountID: number;
    email: string;
    status: AccountStatus;
    source: AccountSource;
    isBlocked?: boolean;
}

export interface Person {
    fullname: string;
}

export interface User extends Account, Person {
    hasPassword?: boolean;
}

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

export interface CreatePasswordParam {
    password: string;
    confirmPassword: string;
}
