import Axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';
import { NotificationConstant } from '~/configs/constants';
import NotifyUtil from '~/utils/NotifyUtil';

const mockAxios = new MockAdapter(Axios, { delayResponse: 500, onNoMatch: 'passthrough' });
export const MockAxios = mockAxios;

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
    items: T[];
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

export const baseDeleteApi = async (url: string, id: string) => {
    const response = await requestApi('delete', `${url}/${id}`);
    if (response.status === 200) {
        NotifyUtil.success(NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
    } else {
        NotifyUtil.error(response.data?.message || NotificationConstant.DESCRIPTION_DELETE_FAIL);
    }
};
