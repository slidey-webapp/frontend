import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '~/AppStore';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import logoSrc from '~/images/logo.png';
import ComponentUtil from '~/utils/ComponentUtil';

interface Props {}

const LandingHeader: React.FC<Props> = () => {
    const { authUser } = useAppSelector(x => x.auth);
    const navigate = useNavigate();

    const renderRight = () => {
        if (authUser)
            return (
                <div className="flex items-center gap-x-4">
                    <ButtonBase color="primary" onClick={() => navigate('/dashboard')} title="Không gian làm việc" />
                    {ComponentUtil.renderAvatarUser({
                        fullName: authUser?.user?.fullname,
                        size: 36,
                        tooltip: true,
                    })}
                </div>
            );

        return (
            <div className="flex gap-x-4">
                <ButtonBase color="secondary" title="Đăng ký" onClick={() => navigate('/register')} />
                <ButtonBase color="primary" title="Đăng nhập" onClick={() => navigate('/login')} />
            </div>
        );
    };

    return (
        <header
            className={clsx('bg-white flex items-center justify-center', 'sticky top-0 left-0 right-0 border-b z-999')}
            style={{
                height: 72,
            }}
        >
            <div className="custom-container">
                <div className="w-full h-full flex justify-between">
                    <div className="flex-1 flex items-center justify-start">
                        <img
                            src={logoSrc}
                            alt="logo"
                            className="object-cover"
                            style={{
                                height: 34,
                            }}
                        />
                    </div>
                    <div className="flex-1 flex items-center justify-end">{renderRight()}</div>
                </div>
            </div>
        </header>
    );
};

export default LandingHeader;
