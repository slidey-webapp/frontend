import clsx from 'clsx';
import React, { useState } from 'react';
import BaseIcon from '~/components/icons/BaseIcon';
import { usePresentationContext } from '../../PresentationDetailPage';
import EditorContent from './EditorContent';
import EditorDesign from './EditorDesign';

interface Props {}

const PresentationBodyEditor: React.FC<Props> = () => {
    const { currentSlideId } = usePresentationContext();
    const [editorType, setEditorType] = useState<'content' | 'design'>('design');

    const renderEditorType = () => {
        return editorType === 'content' ? <EditorContent /> : <EditorDesign />;
    };

    return (
        <>
            <div className="w-80 h-full pr-4 py-4" key={currentSlideId + 'panel'}>
                <div className="w-full h-full flex flex-col bg-white rounded-lg">{renderEditorType()}</div>
            </div>
            <div className="w-30 pr-4 py-4" key={currentSlideId + 'tab-list'}>
                <div className="rounded-lg bg-white p-1 flex flex-col gap-1 text-neutral-600">
                    <div
                        className={clsx(
                            'flex flex-col items-center justify-center p-2 rounded-lg',
                            'cursor-pointer hover:bg-neutral-100 border border-transparent',
                            'transition-all duration-200 ease-in-out hover:bg-indigo-lightest',
                            {
                                'border-neutral-200 hover:border-indigo-main bg-indigo-lightest': editorType === 'content',
                            },
                        )}
                        onClick={() => setEditorType('content')}
                    >
                        <BaseIcon type="drive-file-rename-outlined" />
                        <div className="mt-2 text-sm font-bold">Nội dung</div>
                    </div>
                    <div
                        className={clsx(
                            'flex flex-col items-center justify-center p-2 rounded-lg',
                            'cursor-pointer hover:bg-neutral-100 border border-transparent ',
                            'transition-all duration-200 ease-in-out hover:bg-indigo-lightest',
                            {
                                'border-neutral-200  hover:border-indigo-main bg-indigo-lightest': editorType === 'design',
                            },
                        )}
                        onClick={() => setEditorType('design')}
                    >
                        <BaseIcon type="color-lens-outlined" />
                        <div className="mt-2 text-sm font-bold">Thiết kế</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PresentationBodyEditor;
