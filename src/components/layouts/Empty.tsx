import clsx from 'clsx';
import React from 'react';
import emptySrc from '~/images/empty.svg';

interface Props {
    className?: string;
    size?: number;
}

const Empty: React.FC<Props> = ({ className, size }) => {
    return (
        <div className={clsx('w-full h-full bg-white', className)}>
            <div className="flex flex-col items-center justify-center w-full h-full select-none">
                <img
                    src={emptySrc}
                    style={{
                        height: size || 120,
                        objectFit: 'cover',
                    }}
                />
                <div className="mt-2 text-base">Không có dữ liệu</div>
            </div>
        </div>
    );
};

export default Empty;
