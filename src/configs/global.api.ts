export const APP_API_PATH = process.env.REACT_APP_API_URL as string;

export const CHECK_AUTH_API = APP_API_PATH + '/identity/auth';
export const LOGIN_API = APP_API_PATH + '/identity/login';
export const LOGOUT_API = APP_API_PATH + '/identity/logout';
