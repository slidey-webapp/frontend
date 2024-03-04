import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';

import { Badge, SvgIcon } from '@mui/material';
import BaseIcon from '~/components/icons/BaseIcon';
import { indigo } from '~/themes/colors';
import { QuestionDto } from '~/pages/presentations/types/question';

export const sessionQuestionGridColDef: BaseGridColDef[] = [
    {
        headerName: 'Nội dung',
        field: nameof.full<QuestionDto>(x => x.content),
        minWidth: 200,
    },
    {
        headerName: 'Trạng thái',
        field: nameof.full<QuestionDto>(x => x.isAnswered),
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as QuestionDto;
            const { isAnswered } = data;

            if (!isAnswered)
                return (
                    <div
                        className="rounded-full px-3 h-7 flex items-center w-fit"
                        style={{
                            background: '#f044381f',
                            color: '#b42318',
                        }}
                    >
                        Chưa trả lời
                    </div>
                );
            return (
                <div
                    className="rounded-full px-3 h-7 flex items-center w-fit"
                    style={{
                        background: '#f790091f',
                        color: '#b54708',
                    }}
                >
                    Đã trả lời
                </div>
            );
        },
    },
    {
        headerName: 'Upvote',
        field: nameof.full<QuestionDto>(x => x.totalVoted),
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        cellClass: 'cell-not-overflow',
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as QuestionDto;
            const { totalVoted } = data;
            return (
                <div className="h-full flex items-center justify-center">
                    <Badge
                        color="error"
                        showZero={false}
                        badgeContent={totalVoted}
                        sx={{
                            '& .MuiBadge-badge': {
                                minWidth: '16px',
                                width: '16px',
                                minHeight: '16px',
                                height: '16px',
                            },
                        }}
                    >
                        <BaseIcon
                            type="thumb-up-alt"
                            size={20}
                            style={{
                                color: _.get(indigo, 'main'),
                            }}
                        />
                    </Badge>
                </div>
            );
        },
    },
];
