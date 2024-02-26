import React from 'react';
import error500Src from '~/images/error-500.png';
import { ButtonBase } from '../buttons/ButtonBase';

interface Props {}

const InternalServerError: React.FC<Props> = () => {
    return (
        <div>
            <div className="w-screen h-screen">
                <div className="w-full h-full flex items-center justify-center flex-col">
                    <img src={error500Src} alt="ErrorImage" className="w-96 xs:w-60" />
                    <div className="text-3xl xs:text-2xl mt-5 font-bold">500: Internal Server Error</div>
                    <div className="text-[#6c737f] text-base xs:text-sm mt-1 text-center">
                        Server gặp một số trục trặc
                    </div>
                    <div className="mt-12 flex items-center justify-center gap-x-4">
                        <ButtonBase
                            onClick={() => window.location.reload()}
                            title="Tải lại"
                            startIcon={'reload'}
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

export default InternalServerError;
