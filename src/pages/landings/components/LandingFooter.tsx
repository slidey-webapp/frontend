import React from 'react';
import logoSmallSrc from '~/images/logo-small.png';

interface Props {}

const LandingFooter: React.FC<Props> = () => {
    return (
        <footer className="w-full">
            <div className="flex items-center justify-center py-4 bg-neutral-50">
                <div className="custom-container">
                    <div className="flex gap-x-10">
                        <div className="flex-1">
                            <img
                                src={logoSmallSrc}
                                style={{
                                    objectFit: 'cover',
                                    height: 56,
                                }}
                            />
                        </div>
                        <div className="flex-1 flex justify-end items-center">© 2024 Slidey | Tất cả các quyền được bảo lưu</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
