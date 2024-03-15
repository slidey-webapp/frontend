import clsx from 'clsx';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseIcon from '~/components/icons/BaseIcon';
import { EditorType } from '~/pages/presentations/components/editors/PresentationBodyEditor';
import HistoryUtil from '~/utils/HistoryUtil';
import { useTemplateCreateContext } from '../TemplateCreatePage';
import TemplateCreateEditorContent from './TemplateCreateEditorContent';
import TemplateCreateEditorDesign from './TemplateCreateEditorDesign';

interface Props {}

const TemplateCreateBodyEditor: React.FC<Props> = () => {
    const { currentSlideId } = useTemplateCreateContext();
    const navigate = useNavigate();
    const [editorType, setEditorType] = useState<EditorType>(
        (HistoryUtil.getSearchParam('editorType') as EditorType) || 'content',
    );

    const renderEditorType = () => {
        return editorType === 'content' ? <TemplateCreateEditorContent /> : <TemplateCreateEditorDesign />;
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
                                'border-neutral-200 hover:border-indigo-main bg-indigo-lightest':
                                    editorType === 'content',
                            },
                        )}
                        onClick={() => {
                            HistoryUtil.pushSearchParams(navigate, {
                                editorType: 'content',
                            });
                            setEditorType('content');
                        }}
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
                                'border-neutral-200  hover:border-indigo-main bg-indigo-lightest':
                                    editorType === 'design',
                            },
                        )}
                        onClick={() => {
                            HistoryUtil.pushSearchParams(navigate, {
                                editorType: 'design',
                            });
                            setEditorType('design');
                        }}
                    >
                        <BaseIcon type="color-lens-outlined" />
                        <div className="mt-2 text-sm font-bold">Thiết kế</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TemplateCreateBodyEditor;
