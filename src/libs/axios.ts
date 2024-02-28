import Axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { NotificationConstant } from '~/configs/constants';
import { setLogout } from '~/store/authSlice';
import NotifyUtil from '~/utils/NotifyUtil';

Axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (401 === _.get(error, 'response.status')) {
            console.log(error)
            const dispatch = useDispatch();
            if (_.get(error, 'response.config.url') !== '/api/auth') {
                NotifyUtil.error('Hết phiên làm việc');
                Cookies.remove('token');
                Cookies.remove('refresh-token');
                dispatch(setLogout());
            }
            return true;
        }
    },
);

const mockAxios = new MockAdapter(Axios, { delayResponse: 500, onNoMatch: 'passthrough' });
export const MockAxios = mockAxios;

export enum ApiStatus {
    Ok = 'OK',
    NotFound = 'NOT_FOUND',
    InternalServerError = 'INTERNAL_ERROR',
    UnAuthorized = 'UNAUTHORIZED',
    DbError = 'DB_ERROR',
    InvalidInput = 'INVALID_INPUT',
    Existed = 'EXISTED',
    TokenExpired = 'TOKEN_EXPIRED',
    PermissionDenied = 'PERMISSION_DENIED',
    SendEmailError = 'SEND_EMAIL_ERROR',
    ReceiveEmailError = 'RECEIVE_EMAIL_ERROR',
    NotVerified = 'NOT_VERIFIED',
}

export type ApiResponse<T = any> = {
    errors?: Record<string, string>;
    message?: string;
    result?: T;
};

export type PaginatedList<T = any> = {
    totalCount: number;
    offset: number;
    limit: number;
    totalPages: number;
    currentPage: number;
    items: T[] | null;
};

export type PaginatedListQuery = {
    offset: number;
    limit: number;
};

export type ResultResponse<T = any> = Promise<AxiosResponse<ApiResponse<T>>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 * @param config
 */
export const requestApi = <T = any>(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
): ResultResponse<T> => {
    const token = Cookies.get('token');
    const includeHeadersAuthorizationConfig = {
        ...config,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    switch (method) {
        case 'get':
        case 'GET':
            return Axios.get(url, {
                params: data,
                ...includeHeadersAuthorizationConfig,
            }).catch(error => {
                return Promise.resolve({
                    ...error.response,
                    data: {
                        success: false,
                        ...error.response?.data,
                    },
                });
            });
        case 'post':
        case 'POST':
            return Axios.post(url, data, includeHeadersAuthorizationConfig).catch(error => {
                return Promise.resolve({
                    ...error.response,
                    data: {
                        success: false,
                        ...error.response?.data,
                    },
                });
            });
        case 'delete':
        case 'DELETE':
            return Axios.delete(url, {
                params: data,
                ...includeHeadersAuthorizationConfig,
            }).catch(error => {
                return Promise.resolve({
                    ...error.response,
                    data: {
                        success: false,
                        ...error.response?.data,
                    },
                });
            });
        case 'put':
        case 'PUT':
            return Axios.put(url, data, includeHeadersAuthorizationConfig).catch(error => {
                return Promise.resolve({
                    ...error.response,
                    data: {
                        success: false,
                        ...error.response?.data,
                    },
                });
            });
        default:
            return Axios.get(url, {
                params: data,
                ...includeHeadersAuthorizationConfig,
            }).catch(error => {
                return Promise.resolve({
                    ...error.response,
                    data: {
                        success: false,
                        ...error.response?.data,
                    },
                });
            });
    }
};

export const baseDeleteApi = async (url: string, id: number, method?: Method) => {
    const response = await requestApi(method ?? 'delete', `${url}/${id}`);
    if (response.status === 200) {
        NotifyUtil.success(NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
    } else {
        NotifyUtil.error(response.data?.message || NotificationConstant.DESCRIPTION_DELETE_FAIL);
    }
};

export const baseDeleteWithoutIdApi = async (url: string, data?: Record<string, any>, method?: Method) => {
    const response = await requestApi(method ?? 'delete', url, data);
    if (response.status === 200) {
        NotifyUtil.success(NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
    } else {
        NotifyUtil.error(response.data?.message || NotificationConstant.DESCRIPTION_DELETE_FAIL);
    }
};
