import * as React from 'react';
import { CSSProperties } from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';

type ToolbarType = {
    rightToolbarStyle?: CSSProperties;
    leftToolbarStyle?: CSSProperties;
};

export type GridToolbarProps = {
    hasCreateButton?: boolean;
    hasRefreshButton?: boolean;
    onClickCreateButton?: () => void;
    onClickRefreshButton?: () => void;
    renderActionRightToolBar?: () => JSX.Element;
} & ToolbarType;

const GridToolbar: React.FC<GridToolbarProps> = props => {
    const { hasCreateButton = true, hasRefreshButton = true } = props;
    return (
        <div className="flex items-center justify-end">
            {props.renderActionRightToolBar?.()}
            {hasCreateButton && (
                <ButtonBase
                    onClick={() => props.onClickCreateButton?.()}
                    color={'success'}
                    title="Tạo mới"
                    startIcon={'add'}
                    className='!mx-1'
                />
            )}
            {hasRefreshButton && (
                <ButtonBase
                    title={'Làm mới'}
                    startIcon={'refresh'}
                    onClick={() => props.onClickRefreshButton?.()}
                    className='!mx-1'
                />
            )}
        </div>
    );
};

export default GridToolbar;
