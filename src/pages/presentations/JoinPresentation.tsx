import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppSelector } from '~/AppStore';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseIcon from '~/components/icons/BaseIcon';
import Loading from '~/components/loadings/Loading';
import Overlay, { OverlayRef } from '~/components/loadings/Overlay';
import logo from '~/images/logo.png';
import { requestApi } from '~/libs/axios';
import NotifyUtil from '~/utils/NotifyUtil';
import { COLLABORATION_JOIN_API } from './api/presentation.api';

export interface Props {}

const JoinPresentation: React.FC<Props> = () => {
    const { token } = useParams<{ token: string }>();
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const navigate = useNavigate();

    const overlayRef = useRef<OverlayRef>(null);

    const handleJoining = async (params: { token?: string }) => {
        overlayRef.current?.open();
        const response = await requestApi('post', COLLABORATION_JOIN_API, params);
        overlayRef.current?.close();
        setLoading(false);

        if (response?.status === 200) {
            NotifyUtil.success('Tham gia bài trình chiếu thành công!');
            navigate('/');
            return;
        }

        // @ts-ignore
        setErrorMsg(response.message || response.data?.message || 'Có lỗi xảy ra');
    };

    useEffect(() => {
        handleJoining({ token });
    }, [token]);

    if (isAuthenticated) <Navigate to="/" />;
    if (loading) return <Loading />;
    if (errorMsg)
        return (
            <div className="w-full h-screen relative flex flex-col items-center justify-center" key="login">
                <img
                    src={logo}
                    alt="logo"
                    style={{
                        transform: 'scale(0.6)',
                    }}
                    className=""
                />
                <div className="w-[440px] bg-white rounded-md shadow p-5 flex flex-col">
                    <div className="text-orange-400 font-bold text-xl mb-5">Tham gia bài trình chiếu</div>
                    <div className="w-full h-full flex flex-col items-center justify-center text-sm">
                        <div className="flex items-center">
                            <BaseIcon type="do-disturb" style={{ fontSize: 72, color: '#F04438' }} />
                        </div>
                        <div className="mt-6">
                            <div className="text-center">{errorMsg}</div>
                        </div>
                        <div className="w-full mt-6 flex items-center justify-end">
                            <ButtonBase
                                className="w-full h-10 flex items-center"
                                title="Thử lại"
                                onClick={() => handleJoining({ token })}
                            />
                        </div>
                    </div>
                </div>
                <Overlay ref={overlayRef} />
            </div>
        );

    return <></>;
};

export default JoinPresentation;
