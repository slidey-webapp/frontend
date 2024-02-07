import { motion } from 'framer-motion';
import React from 'react';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import { usePresentationShowContext } from '../../PresentationHostShow';

interface Props {}

const PresentationShowFooter: React.FC<Props> = () => {
    const {
        isFirstSlide,
        isLastSlide,
        isFullScreen,
        slides,
        currentSlideId,
        session,
        onFullScreen,
        onExitFullScreen,
        onSlideChange,
        onHotKeysOverview,
    } = usePresentationShowContext();

    const renderActionButton = () => {
        if (session.status === 'STARTING') return null;

        return (
            <div className="flex-1 px-4 text-black  flex items-center justify-center ">
                <div className="w-full h-full flex items-center justify-between">
                    <div className="flex-1 flex justify-start ">
                        <div className="rounded-full w-fit bg-[#ededf099]">
                            <ButtonIconBase
                                icon={'arrow-back'}
                                tooltip="Slide trước"
                                color={'inherit'}
                                size="large"
                                style={{
                                    margin: 0,
                                    width: 48,
                                    height: 48,
                                    fontSize: 20,
                                }}
                                onClick={() => onSlideChange('previous')}
                                disabled={isFirstSlide}
                            />
                            <ButtonIconBase
                                icon={'arrow-forward'}
                                tooltip="Slide tiếp theo"
                                color={'inherit'}
                                size="large"
                                style={{
                                    margin: 0,
                                    width: 48,
                                    height: 48,
                                    fontSize: 20,
                                }}
                                onClick={() => onSlideChange('next')}
                                disabled={isLastSlide}
                            />
                        </div>
                        <div className="rounded-full w-fit bg-[#ededf099] ml-2">
                            {isFullScreen ? (
                                <ButtonIconBase
                                    icon={'full-screen-exit'}
                                    tooltip="Thoát toàn màn hình"
                                    color={'inherit'}
                                    size="large"
                                    style={{
                                        margin: 0,
                                        width: 48,
                                        height: 48,
                                        fontSize: 20,
                                    }}
                                    onClick={onExitFullScreen}
                                />
                            ) : (
                                <ButtonIconBase
                                    icon={'full-screen'}
                                    tooltip="Toàn màn hình"
                                    color={'inherit'}
                                    size="large"
                                    style={{
                                        margin: 0,
                                        width: 48,
                                        height: 48,
                                        fontSize: 20,
                                    }}
                                    onClick={onFullScreen}
                                />
                            )}
                            <ButtonIconBase
                                icon={'keyboard-alt-outlined'}
                                tooltip="Xem tất cả phím tắt"
                                color={'inherit'}
                                size="large"
                                style={{
                                    margin: 0,
                                    width: 48,
                                    height: 48,
                                    fontSize: 20,
                                }}
                                onClick={onHotKeysOverview}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex justify-end items-center">
                        <div className="mx-1 bg-[#ededf099] rounded-full">
                            <ButtonIconBase
                                icon={'thumb-up-alt'}
                                color={'inherit'}
                                size="large"
                                style={{
                                    margin: 0,
                                    width: 48,
                                    height: 48,
                                    fontSize: 20,
                                }}
                            />
                        </div>
                        <div className="mx-1 bg-[#ededf099] rounded-full">
                            <ButtonIconBase
                                icon={'comment'}
                                color={'inherit'}
                                size="large"
                                style={{
                                    margin: 0,
                                    width: 48,
                                    height: 48,
                                    fontSize: 20,
                                }}
                            />
                        </div>
                        <div className="mx-1 bg-[#ededf099] rounded-full">
                            <ButtonIconBase
                                icon={'question-answer'}
                                color={'inherit'}
                                size="large"
                                style={{
                                    margin: 0,
                                    width: 48,
                                    height: 48,
                                    fontSize: 20,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderProgressBar = () => {
        if (session.status === 'STARTING') return null;

        const currentSlideIndex = slides.findIndex(x => x.slideID === currentSlideId);

        return (
            <div className="w-full h-1 bg-transparent mb-[1px]">
                <motion.div
                    style={{
                        height: '100%',
                        background: 'black',
                    }}
                    animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
                    transition={{ duration: 1 }}
                />
            </div>
        );
    };

    return (
        <div className="w-full h-24 flex flex-col">
            {renderActionButton()}
            {renderProgressBar()}
        </div>
    );
};

export default PresentationShowFooter;
