import React from 'react';
import { ReactComponent as AnsweredIcon } from '~/images/question-answered.svg';

interface Props {}

const AlreadyResponse: React.FC<Props> = () => {
    return (
        <div>
            <div
                className="w-fit flex flex-col justify-center"
                style={{
                    height: 150,
                }}
            >
                <div id="springy-animation" className="w-fit h-fit">
                    <AnsweredIcon
                        style={{
                            height: 100,
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </div>
            <div className="mt-16">
                <div className="font-semibold text-xs">Vui lòng chờ...</div>
                <div className="text-xl">Bạn đã trả lời câu hỏi này rồi</div>
            </div>
        </div>
    );
};

export default AlreadyResponse;
