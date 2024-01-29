import { AxiosResponse } from 'axios';

import { useQuery } from 'react-query';
import { ApiResponse, PaginatedList, requestApi } from '~/libs/axios';
import { ExtractFnReturnType, QueryConfig } from '~/libs/react-query';
import { Id } from '~/types/shared';
import { CollaborationDto } from '../types/collaboration';
import { COLLABORATION_INDEX_API } from './presentation.api';

export const getCollaborationsQuery = async (
    params: {
        presentationID: Id;
    },
    signal?: AbortSignal,
): Promise<AxiosResponse<ApiResponse<PaginatedList<CollaborationDto>>>> => {
    return requestApi('get', COLLABORATION_INDEX_API, null, { params, signal });
};

type QueryFnType = typeof getCollaborationsQuery;

type UseCollaborationsQuery = QueryConfig<QueryFnType>;

export const useCollaborationsQuery = (
    params: {
        presentationID: Id;
    },
    config?: UseCollaborationsQuery,
) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['CollaborationsQuery', ...Object.keys(params)],
        queryFn: ({ signal }) => getCollaborationsQuery(params, signal),
        ...config,
    });
};
