import Axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { NotificationConstant } from '~/configs/constants';
import NotifyUtil from '~/utils/NotifyUtil';
import MockAdapter from 'axios-mock-adapter';

export const axios = Axios.create({
    baseURL: '/',
    headers: { Accept: 'application/json' },
});

const mockAxios = new MockAdapter(Axios, { delayResponse: 500, onNoMatch: 'passthrough' });
export const MockAxios = mockAxios;

export type ApiResponse<T = any> = {
    success: boolean;
    errors?: Record<string, string[]>;
    message?: string;
    result?: T;
    totalCount?: number;
    error?: Record<string, string[]>;
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
    switch (method) {
        case 'get':
        case 'GET':
            return Axios.get(url, {
                params: data,
                ...config,
            }).catch(error => {
                console.log('errorRequest', error, error?.response, error?.response?.status);
                return Promise.resolve({
                    ...error.response,
                    data: {
                        success: false,
                        message: '',
                        errors: error.response?.data?.errors,
                    },
                });
            });
        case 'post':
        case 'POST':
            return Axios.post(url, data, config).catch(error => {
                console.log('errorRequest', error, error.response, error.response?.status);
                return Promise.resolve({
                    ...error.response,
                    data: {
                        success: false,
                        message: '',
                        errors: error.response?.data?.errors || error.response?.data?.error,
                    },
                });
            });
        case 'delete':
        case 'DELETE':
            return Axios.delete(url, {
                params: data,
                ...config,
            }).catch(error => {
                console.log('errorRequest', error, error.response, error.response?.status);
                return Promise.resolve({
                    ...error.response,
                    data: {
                        success: false,
                        message: '',
                        errors: error.response?.data?.errors,
                    },
                });
            });
        case 'put':
        case 'PUT':
            return Axios.put(url, data, config).catch(error => {
                console.log('errorRequest', error, error.response, error.response?.status);
                return Promise.resolve({
                    ...error.response,
                    data: {
                        success: false,
                        message: '',
                        errors: error.response?.data?.errors,
                    },
                });
            });
        default:
            return Axios.get(url, {
                params: data,
                ...config,
            }).catch(error => {
                console.log('errorRequest', error, error.response, error.response?.status);
                return Promise.resolve({
                    ...error.response,
                    data: {
                        success: false,
                        message: '',
                        errors: error.response?.data?.errors,
                    },
                });
            });
    }
};

export const baseDeleteApi = async (url: string, id: string) => {
    const response = await requestApi('delete', `${url}/${id}`);
    if (response.data?.success) {
        NotifyUtil.success(NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
    } else {
        NotifyUtil.error(response.data?.message || NotificationConstant.DESCRIPTION_DELETE_FAIL);
    }
};
