import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AppThunk } from '~/AppStore';
import { CHECK_AUTH_API, GOOGLE_LOGIN_API, LOGIN_API, LOGOUT_API } from '~/configs/global.api';
import { requestApi } from '~/libs/axios';
import { AuthUser, LoginParam, LoginType } from '~/types/auth';
import NotifyUtil from '~/utils/NotifyUtil';

interface AuthState {
    loading: boolean;
    checkLoginLoading: boolean;
    status: 'idle' | 'loading' | 'full_filled' | 'rejected';
    isAuthenticated: boolean;
    authUser?: AuthUser;
}

const initialState: AuthState = {
    status: 'idle',
    checkLoginLoading: true,
    isAuthenticated: false,
    loading: false,
    authUser: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<AuthUser | undefined>) => {
            state.isAuthenticated = true;
            state.authUser = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setLoadingCheckLogin: (state, action: PayloadAction<boolean>) => {
            state.checkLoginLoading = action.payload;
        },
        setLogout: (state, action: PayloadAction<undefined>) => {
            state.isAuthenticated = false;
            state.authUser = undefined;
        },
    },
});

export const { setAuthData, setLoading, setLogout, setLoadingCheckLogin } = authSlice.actions;

export const fetchAuthDataAsync = (): AppThunk => async dispatch => {
    dispatch(setLoadingCheckLogin(true));
    try {
        const response = await requestApi<
            Omit<AuthUser, 'claims'> & {
                claims: {
                    code: string;
                }[];
            }
        >('get', CHECK_AUTH_API);
        if (response.status === 200) {
            const result = response.data.result;
            if (!result) return;

            const authUser: AuthUser = {
                ...result,
                claims: result?.claims?.map(x => x.code) || [],
            };
            dispatch(setAuthData(authUser));
        }
    } catch (err) {
        console.error(err);
    } finally {
        dispatch(setLoadingCheckLogin(false));
    }
};

export const loginAsync =
    (
        {
            type,
            params,
        }: {
            type: LoginType;
            params: LoginParam | { token: string };
        },
        loginSuccessFullCallback: (authUser?: AuthUser) => void,
        callback?: () => void,
    ): AppThunk =>
    async dispatch => {
        dispatch(setLoading(true));
        const response = await requestApi<
            Omit<AuthUser, 'claims'> & {
                claims: {
                    code: string;
                }[];
            }
        >('post', type === 'login' ? LOGIN_API : GOOGLE_LOGIN_API, params);
        dispatch(setLoading(false));
        if (response?.status === 200 || response?.status === 400) {
            if (response.status === 200) {
                const result = response.data.result;
                if (!result) return;

                const authUser: AuthUser = {
                    ...result,
                    claims: result?.claims?.map(x => x.code) || [],
                };

                dispatch(setAuthData(authUser));
                loginSuccessFullCallback(authUser);
                Cookies.set('token', authUser.token, {
                    expires: 1,
                });
                Cookies.set('refresh-token', authUser.refreshToken, {
                    expires: 1,
                });
            } else {
                NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra');
            }
        } else {
            NotifyUtil.error(response.data.message || 'Lỗi kết nối máy chủ, xin vui lòng liên hệ quản trị viên hoặc thử lại sau');
        }
        callback?.();
        return true;
    };

export const logoutAsync =
    (logoutSuccessFullCallback: () => void, notify: boolean): AppThunk =>
    async dispatch => {
        dispatch(setLoading(true));
        const response = await requestApi('post', LOGOUT_API);
        if (response.status === 200) {
            notify && NotifyUtil.success('Đăng xuất thành công!');
            Cookies.remove('token');
            Cookies.remove('refresh-token');
            dispatch(setLogout());
            logoutSuccessFullCallback();
        }
        dispatch(setLoading(false));
        return true;
    };
