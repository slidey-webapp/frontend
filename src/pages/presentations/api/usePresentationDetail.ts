import { AxiosResponse } from 'axios';

import { useQuery } from 'react-query';
import { ApiResponse, requestApi } from '~/libs/axios';
import { ExtractFnReturnType, QueryConfig } from '~/libs/react-query';
import { PresentationDto } from '../types/presentation';
import { SlideDto } from '../types/slide';
import { PRESENTATION_DETAIL_API } from './presentation.api';

export const getPresentationDetail = async (
    id?: string,
    signal?: AbortSignal,
): Promise<AxiosResponse<ApiResponse<PresentationDto & { slides?: SlideDto[] }>>> => {
    return requestApi('get', PRESENTATION_DETAIL_API + '/' + id, null, { signal });
};

type QueryFnType = typeof getPresentationDetail;

type UsePresentationDetail = QueryConfig<QueryFnType>;

export const usePresentationDetail = (id?: string, config?: UsePresentationDetail) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['PresentationDetail', id],
        queryFn: ({ signal }) => getPresentationDetail(id, signal),
        enabled: !!id,
        ...config,
    });
};
