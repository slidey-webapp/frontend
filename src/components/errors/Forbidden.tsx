import React from 'react';
import { useNavigate } from 'react-router-dom';
import error403Src from '~/images/error-403.png';
import { ButtonBase } from '../buttons/ButtonBase';

export interface Props {}

const Forbidden: React.FC<Props> = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex items-center justify-center flex-col">
            <img src={error403Src} alt="ErrorImage" className="w-60" />
            <div className="text-xl mt-5 font-bold">403: Forbidden</div>
            <div className="text-[#6c737f] text-base mt-1 text-center">
                Bạn không có quyền thực hiện hành động này
            </div>
            <div className="mt-12 flex items-center justify-center gap-x-4">
                <ButtonBase
                    onClick={() => navigate(-1)}
                    title="Về trang trước"
                    startIcon={'arrow-back'}
                    color="secondary"
                />
                <ButtonBase
                    onClick={() => window.location.assign(window.location.origin)}
                    title="Trang chủ"
                    startIcon={'home'}
                    color="primary"
                />
            </div>
        </div>
    );
};

export default Forbidden;
