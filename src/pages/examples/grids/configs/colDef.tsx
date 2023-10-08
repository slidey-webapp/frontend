import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';
import { ExampleGridDto, Gender } from '../types/example-grid';

export const ExampleGridColDef: BaseGridColDef[] = [
    {
        headerName: 'Tên',
        field: nameof.full<ExampleGridDto>(x => x.name),
        minWidth: 250,
    },
    {
        headerName: 'Mã',
        field: nameof.full<ExampleGridDto>(x => x.code),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 200,
        maxWidth: 200,
    },
    {
        headerName: 'Tuổi',
        field: nameof.full<ExampleGridDto>(x => x.age),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        maxWidth: 150,
    },
    {
        headerName: 'Giới tính',
        field: nameof.full<ExampleGridDto>(x => x.gender),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        maxWidth: 150,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as ExampleGridDto;
            const { gender } = data;
            let genderTranslated = 'Nam';
            switch (gender) {
                case Gender.Female:
                    genderTranslated = 'Nữ';
                    break;
                case Gender.Other:
                    genderTranslated = 'Khác';
                    break;
                case Gender.Male:
                default:
                    genderTranslated = 'Nam';
            }
            return <div className="h-full flex items-center justify-center">{genderTranslated}</div>;
        },
    },
];
