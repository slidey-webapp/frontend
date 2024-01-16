import clsx from 'clsx';
import React from 'react';
import BaseIcon from '~/components/icons/BaseIcon';

interface Props {}

const PresentationBody: React.FC<Props> = props => {
    return (
        <div className="flex-1 h-full bg-neutral-100 flex">
            <div className="flex-1 bg-inherit p-4">
                <div
                    className="flex-1 bg-white rounded-lg p-8"
                    style={{
                        aspectRatio: '16 / 9',
                        height: 'fit-content',
                        maxWidth: 960,
                    }}
                >
                    IHIHI
                </div>
            </div>
            <div className="w-80 h-full pr-4 py-4">
                <div className="w-full h-full flex flex-col bg-white rounded-lg">
                    <div className="w-full h-14 px-4 flex items-center justify-between border-b border-neutral-100">
                        <div>heading</div>
                        <div>
                            <BaseIcon type="close" className="cursor-pointer" />
                        </div>
                    </div>
                    <div className="overflow-x-hidden overflow-y-auto p-4 flex-1">
                        <div className="flex flex-col">
                            {Array(1)
                                .fill(0)
                                .map((x, index) => {
                                    return <div key={index}>Lorem ipsum dolor sit, amet cons</div>;
                                })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-30 pr-4 py-4">
                <div className="rounded-lg bg-white p-1 flex flex-col gap-1 text-neutral-600">
                    {Array(2)
                        .fill(0)
                        .map((x, index) => {
                            const active = index === 0;
                            return (
                                <div
                                    key={index}
                                    className={clsx(
                                        'flex flex-col items-center justify-center p-2 rounded-lg',
                                        'cursor-pointer hover:bg-neutral-100',
                                        'transition-all duration-200 ease-in-out',
                                        {
                                            'border border-light bg-indigo-lightest hover:bg-indigo-lightest hover:border-indigo-main':
                                                active,
                                        },
                                    )}
                                >
                                    <BaseIcon type="drive-file-rename-outlined" />
                                    <div className="mt-2 text-sm font-bold">Content</div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default PresentationBody;
