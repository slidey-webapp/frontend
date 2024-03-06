import React from 'react';
import { ReactComponent as HourGlass } from '~/images/hour-glass.svg';

interface Props {}

const WaitingNextSlide: React.FC<Props> = () => {
    return (
        <div>
            <div
                className="w-fit flex flex-col justify-center"
                style={{
                    height: 150,
                }}
            >
                <div id="springy-animation" className="w-fit h-fit">
                    <HourGlass
                        style={{
                            height: 100,
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </div>
            <div className="mt-16">
                <div className="font-semibold text-xs">Vui lòng chờ...</div>
                <div className="text-xl">Người chủ trì vẫn chưa chuyển slide</div>
            </div>
        </div>
    );
};

export default WaitingNextSlide;
