import { forwardRef, Ref } from 'react';

import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import { BaseGridResponse } from '~/hooks/useBaseGrid';

import { sessionQuestionGridColDef } from '../config/questionGridRef';
import { QuestionDto } from '../types/question';

interface QuestionGridProps {
    gridController: BaseGridResponse<QuestionDto>;
}

const QuestionGrid = ({ gridController }: QuestionGridProps, ref: Ref<BaseGridRef>) => {
    return (
        <BaseGrid
            {...gridController}
            columnDefs={sessionQuestionGridColDef}
            ref={ref}
            actionRowsList={{
                hasDetailBtn: false,
                hasDeleteBtn: false,
            }}
            defaultColDef={{
                autoHeight: true,
            }}
            actionRows={false}
        />
    );
};

export default forwardRef<BaseGridRef, QuestionGridProps>(QuestionGrid);
