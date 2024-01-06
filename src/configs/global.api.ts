export const APP_API_PATH = process.env.REACT_APP_API_URL as string;

export const CHECK_AUTH_API = APP_API_PATH + '/account/auth';
export const LOGIN_API = APP_API_PATH + '/account/login';
export const SIGN_UP_API = APP_API_PATH + '/account/sign-up';
export const GOOGLE_LOGIN_API = APP_API_PATH + '/account/google-login';
export const VERIFY_ACCOUNT_API = APP_API_PATH + '/account/verify';

export const CREATE_PASSWORD_API = APP_API_PATH + '/account/create-password';
export const CHANGE_PASSWORD_API = APP_API_PATH + '/account/change-password';
export const FORGOT_PASSWORD_API = APP_API_PATH + '/account/forgot-password';
export const RESET_PASSWORD_API = APP_API_PATH + '/account/reset-password';

export const LOGOUT_API = APP_API_PATH + '/account/logout';
