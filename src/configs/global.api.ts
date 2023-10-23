export const APP_API_PATH = process.env.REACT_APP_API_URL as string;

export const CHECK_AUTH_API = APP_API_PATH + '/account/auth';
export const LOGIN_API = APP_API_PATH + '/account/login';
export const SIGN_UP_API = APP_API_PATH + '/account/sign-up';
export const GOOGLE_LOGIN_API = APP_API_PATH + '/account/google-login';

export const LOGOUT_API = APP_API_PATH + '/account/logout';
