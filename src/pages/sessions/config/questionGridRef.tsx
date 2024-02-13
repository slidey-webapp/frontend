import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';

import { QuestionDto } from '../types/question';

export const sessionQuestionGridColDef: BaseGridColDef[] = [
    {
        headerName: 'Nội dung',
        field: nameof.full<QuestionDto>(x => x.content),
        minWidth: 200,
    },
    {
        headerName: 'Trạng thái',
        field: nameof.full<QuestionDto>(x => x.isAnswered),
        minWidth: 200,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as QuestionDto;
            const { isAnswered } = data;
            if (!isAnswered) return <div className="h-full flex items-center justify-center">Chưa trả lời</div>;
            return <div className="h-full flex items-center justify-center">Đã trả lời</div>;
        },
    },
    {
        headerName: 'Upvote',
        field: nameof.full<QuestionDto>(x => x.totalVoted),
        minWidth: 200,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as QuestionDto;
            const { totalVoted } = data;
            return <div className="h-full flex items-center justify-center">{totalVoted}</div>;
        },
    },
];
