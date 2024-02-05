import React from 'react';

interface Props {}

const PresentationHotKeysOverview: React.FC<Props> = () => {
    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex flex-col gap-y-4">
                {[
                    {
                        keyCode: '→',
                        text: 'Đi đến slide kế tiếp',
                        style: {
                            fontSize: 14,
                        },
                    },
                    {
                        keyCode: '←',
                        text: 'Trở về slide trước đó',
                        style: {
                            fontSize: 14,
                        },
                    },
                    {
                        keyCode: 'ESC',
                        text: 'Thoát trình chiếu',
                    },
                    {
                        keyCode: 'F',
                        text: 'Toàn màn hình',
                    },
                    {
                        keyCode: 'K',
                        text: 'Xem tất cả phím tắt',
                    },
                ].map((item, index) => {
                    return (
                        <div className="w-full flex items-center" key={item.keyCode}>
                            <div
                                className="flex items-center justify-center bg-black text-white font-semibold rounded"
                                style={{
                                    height: 20,
                                    minWidth: 20,
                                    padding: '0 2px',
                                    fontSize: 11,
                                    ...item.style,
                                }}
                            >
                                {item.keyCode}
                            </div>
                            <div className="ml-2 text-black">{item.text}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PresentationHotKeysOverview;
