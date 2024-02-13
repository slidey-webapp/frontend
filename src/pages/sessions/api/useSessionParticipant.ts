import { AxiosResponse } from 'axios';

import { useQuery } from 'react-query';
import { ApiResponse, requestApi } from '~/libs/axios';
import { ExtractFnReturnType, QueryConfig } from '~/libs/react-query';
import { Id } from '~/types/shared';
import { ParticipantDto } from '../types/participant';
import { SESSION_PARTICIPANT_API } from './session.api';

export const getSessionParticipants = async (
    id: Id,
    {
        signal,
    }: {
        signal: AbortSignal | undefined;
    },
): Promise<AxiosResponse<ApiResponse<{ participants: ParticipantDto[] }>>> => {
    return requestApi('get', SESSION_PARTICIPANT_API, null, {
        signal,
        params: {
            sessionID: id,
        },
    });
};

type QueryFnType = typeof getSessionParticipants;

type UseSessionParticipants = QueryConfig<QueryFnType>;

export const useSessionParticipants = (id: Id, config?: UseSessionParticipants) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['SessionParticipants', id],
        queryFn: ({ signal }) => getSessionParticipants(id, { signal }),
        ...config,
    });
};
