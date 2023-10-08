import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '~/AppStore';
import { CHECK_AUTH_API, LOGIN_API, LOGOUT_API } from '~/configs/global.api';
import { requestApi } from '~/libs/axios';
import { AuthUser, LoginParam } from '~/types/auth';
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
        const instanceAxios = axios.create();
        const response = await instanceAxios.get(CHECK_AUTH_API);
        // @ts-ignore
        if (response.data?.success) {
            // @ts-ignore
            await dispatch(setAuthData(response.data.result));
        }
    } catch (err) {
        console.error(err);
    } finally {
        dispatch(setLoadingCheckLogin(false));
    }
};

export const loginAsync =
    (params: LoginParam, loginSuccessFullCallback: () => void): AppThunk =>
    async dispatch => {
        dispatch(setLoading(true));
        const response = await requestApi<AuthUser>('post', LOGIN_API, params);
        dispatch(setLoading(false));
        if (response?.status == 200 || response?.status == 400) {
            if (response.data.success) {
                dispatch(setAuthData(response.data.result));
                loginSuccessFullCallback();
            } else {
                NotifyUtil.error('Sai tài khoản hoặc mật khẩu');
            }
        } else {
            NotifyUtil.error('Lỗi kết nối máy chủ, xin vui lòng liên hệ quản trị viên hoặc thử lại sau');
        }
        return true;
    };

export const logoutAsync =
    (loginSuccessFullCallback: () => void): AppThunk =>
    async dispatch => {
        dispatch(setLoading(true));
        const response = await requestApi<AuthUser>('get', LOGOUT_API);
        if (response.data.success) {
            NotifyUtil.success('Đăng xuất thành công!');
            dispatch(setLogout());
            loginSuccessFullCallback();
        }
        dispatch(setLoading(false));
        return true;
    };
