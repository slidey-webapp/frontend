import React from 'react';
import { useNavigate } from 'react-router-dom';
import error404Src from '~/images/error-404.png';
import { ButtonBase } from '../buttons/ButtonBase';

export interface Props {}

const NotFound: React.FC<Props> = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="w-screen h-screen">
                <div className="w-full h-full flex items-center justify-center flex-col">
                    <img src={error404Src} alt="ErrorImage" className="w-96 xs:w-60" />
                    <div className="text-3xl xs:text-2xl mt-5 font-bold">404: Not Found</div>
                    <div className="text-[#6c737f] text-base xs:text-sm mt-1 text-center">
                        Trang bạn yêu cầu không tồn tại
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
            </div>
        </div>
    );
};

export default NotFound;
