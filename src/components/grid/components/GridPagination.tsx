import { Pagination } from '@mui/material';
import React from 'react';
import { BaseGridResponse } from '~/hooks/useBaseGrid';

interface Props extends Pick<BaseGridResponse<any>, 'onChangePage' | 'paginatedList'> {}

const GridPagination: React.FC<Props> = ({ paginatedList, onChangePage }) => {
    return (
        <div className="h-12 w-full">
            <div className="w-full h-full flex items-center justify-end">
                <Pagination
                    count={paginatedList.totalPages}
                    defaultPage={paginatedList.currentPage + 1}
                    showFirstButton
                    showLastButton
                    variant="text"
                    color="primary"
                    onChange={(event, page) => onChangePage(page)}
                />
            </div>
        </div>
    );
};

export default GridPagination;
