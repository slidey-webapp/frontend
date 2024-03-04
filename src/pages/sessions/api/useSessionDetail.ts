import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { ApiResponse, requestApi } from '~/libs/axios';
import { ExtractFnReturnType, QueryConfig } from '~/libs/react-query';
import { User } from '~/types/auth';
import { Id } from '~/types/shared';

import { SESSION_DETAIL_API } from './session.api';
import { SlideDto } from '~/pages/presentations/types/slide';
import { PresentationDto } from '~/pages/presentations/types/presentation';
import { SessionDto } from '~/pages/presentations/types/session';

export const getSessionDetail = async (
    id?: Id,
    signal?: AbortSignal,
): Promise<
    AxiosResponse<
        ApiResponse<{
            session: SessionDto;
            presentation: PresentationDto & { slides?: SlideDto[] };
            host: User;
            totalMessage: number;
        }>
    >
> => {
    return requestApi('get', SESSION_DETAIL_API + '/' + id, null, { signal });
};

type QueryFnType = typeof getSessionDetail;

type UseSessionDetail = QueryConfig<QueryFnType>;

export const useSessionDetail = (id?: Id, config?: UseSessionDetail) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['SessionDetail', id],
        queryFn: ({ signal }) => getSessionDetail(id, signal),
        enabled: !!id,
        ...config,
    });
};
