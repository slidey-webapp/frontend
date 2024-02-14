import { forwardRef, Ref } from 'react';

import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import { BaseGridResponse } from '~/hooks/useBaseGrid';

import { sessionParticipantGridColDef } from '../config/participantColDef';
import { ParticipantDto } from '../types/participant';

interface ParticipantGridProps {
    gridController: BaseGridResponse<ParticipantDto>;
}

const ParticipantGrid = ({ gridController }: ParticipantGridProps, ref: Ref<BaseGridRef>) => {
    return (
        <BaseGrid
            {...gridController}
            columnDefs={sessionParticipantGridColDef}
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

export default forwardRef<BaseGridRef, ParticipantGridProps>(ParticipantGrid);
