import { AxiosResponse } from 'axios';

import { useQuery } from 'react-query';
import { ApiResponse, requestApi } from '~/libs/axios';
import { ExtractFnReturnType, QueryConfig } from '~/libs/react-query';
import { PresentationDto } from '../types/presentation';
import { SessionDto } from '../types/session';
import { SlideDto } from '../types/slide';
import { SESSION_DETAIL_API } from './presentation.api';

export const getSessionDetail = async (
    id?: string,
    signal?: AbortSignal,
): Promise<
    AxiosResponse<
        ApiResponse<{
            session: SessionDto;
            presentation: PresentationDto & { slides?: SlideDto[] };
        }>
    >
> => {
    return requestApi('get', SESSION_DETAIL_API + '/' + id, null, { signal });
};

type QueryFnType = typeof getSessionDetail;

type UseSessionDetail = QueryConfig<QueryFnType>;

export const useSessionDetail = (id?: string, config?: UseSessionDetail) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['SessionDetail', id],
        queryFn: ({ signal }) => getSessionDetail(id, signal),
        enabled: !!id,
        ...config,
    });
};
