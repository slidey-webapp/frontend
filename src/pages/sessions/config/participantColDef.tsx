import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';

import { ParticipantDto } from '../types/participant';

export const sessionParticipantGridColDef: BaseGridColDef[] = [
    {
        headerName: 'Tên',
        field: nameof.full<ParticipantDto>(x => x.name),
        minWidth: 200,
    },
    {
        headerName: 'Email',
        field: nameof.full<ParticipantDto>(x => x.email),
        minWidth: 200,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as ParticipantDto;
            const { email } = data;
            if (!email) return <>Ẩn danh</>;
            return <>{email}</>;
        },
    },
];
