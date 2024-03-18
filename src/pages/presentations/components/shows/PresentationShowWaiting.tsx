import { Tooltip } from '@mui/material';
import clsx from 'clsx';
import QRCode from 'qrcode.react';
import React, { useRef } from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import { requestApi } from '~/libs/axios';
import { usePresentationShowContext } from '../../PresentationHostShow';
import { SESSION_START_API } from '../../api/presentation.api';
import ComponentUtil from '~/utils/ComponentUtil';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';

interface Props {
    code: string;
}

const PresentationShowWaiting: React.FC<Props> = ({ code }) => {
    const joiningUrl = window.location.origin + '/join/' + code;

    const { sessionId, setState, participants } = usePresentationShowContext();
    const modalRef = useRef<ModalBaseRef>(null);

    const handleStartSession = async () => {
        await requestApi('post', SESSION_START_API, {
            sessionID: sessionId,
        }).then(() => {
            setState(pre => ({
                ...pre,
                session: {
                    ...pre.session,
                    status: 'STARTED',
                },
            }));
        });
    };

    const handleViewQr = () => {
        modalRef.current?.onOpen(
            <div
                className="p-4"
                style={{
                    width: 500,
                    height: 500,
                }}
            >
                <JoiningQRCode url={joiningUrl} size={468} />
            </div>,
            '',
            500,
        );
    };

    const JoiningQRCode: React.FC<{
        url: string;
        size?: number;
        width?: number | string;
        height?: number | string;
    }> = ({ url, size, width, height }) => {
        return (
            <QRCode
                value={url}
                renderAs="canvas"
                size={size}
                width={width}
                height={height}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'L'}
                includeMargin={false}
            />
        );
    };

    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div
                className="w-fit flex items-center justify-between gap-x-8 p-4 rounded-2xl bg-white"
                style={{
                    height: 200,
                    boxShadow: 'rgba(22, 22, 23, 0.1) 0px 1px 20px 1px',
                }}
            >
                <div className="h-full flex-1 flex flex-col justify-center">
                    <div className="font-medium text-2xl">
                        Tham gia bài trình chiếu tại
                        <span className="font-extrabold ml-2">{`${window.location.origin}`}</span>
                    </div>
                    <div className="mt-4" onClick={async () => await navigator.clipboard.writeText(joiningUrl)}>
                        <Tooltip title="Nhấn vào đây để sao chép liên kết">
                            <div
                                className={clsx(
                                    'w-fit font-black text-6xl cursor-pointer bg-white py-3 px-5 rounded-lg',
                                    'transition-all duration-300 ease-in-out hover:bg-neutral-50',
                                )}
                            >
                                {code}
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <div className="w-fit h-fit relative group">
                    <JoiningQRCode url={joiningUrl} size={168} />
                    <div
                        className={clsx(
                            'absolute top-0 left-0 w-full h-full flex opacity-0 items-center justify-center',
                            'transition-all duration-200 ease-in-out group-hover:!opacity-100 z-10 cursor-default',
                        )}
                        style={{
                            background: 'rgba(0, 0, 0, 0.45)',
                            color: '#fff',
                        }}
                    >
                        <ButtonIconBase
                            icon="eye-outlined"
                            tooltip="Xem ảnh"
                            color="inherit"
                            size={'extraLarge'}
                            onClick={handleViewQr}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <ButtonBase
                    color={'primary'}
                    title="Bắt đầu"
                    startIcon={'play-arrow'}
                    className="!mx-1"
                    style={{
                        fontSize: 24,
                    }}
                    iconProps={{
                        style: {
                            fontSize: 24,
                        },
                    }}
                    onClick={handleStartSession}
                    disabled={participants.length === 0}
                />
            </div>
            <div className="mt-10">
                <div className="w-full h-full flex flex-wrap gap-6">
                    {!participants || participants.length === 0 ? (
                        <div
                            style={{}}
                            className="flex items-center text-3xl py-2 px-4 rounded bg-indigo-main text-white font-bold"
                        >
                            <span className="mr-1">Chờ người tham gia</span>
                            <div className="dot-wave">
                                <span className="dot text-white">.</span>
                                <span className="dot text-white">.</span>
                                <span className="dot text-white">.</span>
                            </div>
                        </div>
                    ) : (
                        participants.map(participant => {
                            const index = ComponentUtil.generateRandom(participant.name);
                            const background = ComponentUtil.ARRAY_COLOR_CONSTANT[index];

                            return (
                                <div
                                    key={participant.participantID}
                                    className="flex items-center gap-x-3 text-2xl font-bold px-4 py-3 rounded"
                                    style={{
                                        background: `${background}20`,
                                        color: background,
                                    }}
                                >
                                    {ComponentUtil.renderAvatarUser({
                                        fullName: participant.name,
                                        size: 48,
                                        style: {
                                            fontSize: 24,
                                        },
                                    })}
                                    <div>{participant.name}</div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <ModalBase ref={modalRef} className="!p-0" />
        </div>
    );
};

export default PresentationShowWaiting;
