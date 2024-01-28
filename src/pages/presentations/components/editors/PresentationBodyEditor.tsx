import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import BaseIcon from '~/components/icons/BaseIcon';
import { ComboOptionConstant } from '~/configs/constants';
import { usePresentationContext } from '../../PresentationDetailPage';
import { SlideDto } from '../../types/slide';
import EditorHeadingSlide from './EditorHeadingSlide';
import EditorParagraphSlide from './EditorParagraphSlide';

interface Props {}

const PresentationBodyEditor: React.FC<Props> = props => {
    const { currentSlideId, slides, onUpdatePresentation } = usePresentationContext();
    const slide = slides.find(x => x.slideID === currentSlideId) || ({} as SlideDto);

    const renderEditorType = useCallback(() => {
        switch (slide?.type) {
            case 'HEADING':
                return <EditorHeadingSlide slide={slide} slides={slides} onUpdatePresentation={onUpdatePresentation} />;
            case 'PARAGRAPH':
                return <EditorParagraphSlide slide={slide} slides={slides} onUpdatePresentation={onUpdatePresentation} />;
            case 'MULTIPLE_CHOICE':
                return <div>MULTIPLE_CHOICE</div>;
            case null:
            default:
                return null;
        }
    }, [currentSlideId, slide.type]);

    return (
        <>
            <div className="w-80 h-full pr-4 py-4" key={currentSlideId + 'panel'}>
                <div className="w-full h-full flex flex-col bg-white rounded-lg">
                    <div className="w-full h-14 px-4 flex items-center justify-between border-b border-neutral-100">
                        <div>Nội dung</div>
                        <div>
                            <BaseIcon type="close" className="cursor-pointer" />
                        </div>
                    </div>
                    <div className="overflow-x-hidden overflow-y-auto flex-1">
                        <div className="flex flex-col">
                            <div className="p-4 border-b border-neutral-100">
                                <FormControl fullWidth size="small">
                                    <FormLabel
                                        style={{
                                            marginBottom: 10,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Loại slide
                                    </FormLabel>
                                    <Select
                                        value={slide.type}
                                        SelectDisplayProps={{
                                            style: {
                                                lineHeight: '1.4375em',
                                            },
                                        }}
                                        {...props}
                                    >
                                        {ComboOptionConstant.SLIDE_TYPE.map(({ value, label }) => {
                                            return (
                                                <MenuItem key={value} value={value}>
                                                    {label}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="p-4 border-b border-neutral-100">{renderEditorType()}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-30 pr-4 py-4" key={currentSlideId + 'tab-list'}>
                <div className="rounded-lg bg-white p-1 flex flex-col gap-1 text-neutral-600">
                    <div
                        className={clsx(
                            'flex flex-col items-center justify-center p-2 rounded-lg',
                            'cursor-pointer hover:bg-neutral-100',
                            'transition-all duration-200 ease-in-out',
                            {
                                'border border-light bg-indigo-lightest hover:bg-indigo-lightest hover:border-indigo-main':
                                    //todo: ...
                                    true,
                            },
                        )}
                    >
                        <BaseIcon type="drive-file-rename-outlined" />
                        <div className="mt-2 text-sm font-bold">Nội dung</div>
                    </div>
                    <div
                        className={clsx(
                            'flex flex-col items-center justify-center p-2 rounded-lg',
                            'cursor-pointer hover:bg-neutral-100',
                            'transition-all duration-200 ease-in-out',
                            {
                                'border border-light bg-indigo-lightest hover:bg-indigo-lightest hover:border-indigo-main':
                                    false,
                            },
                        )}
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
