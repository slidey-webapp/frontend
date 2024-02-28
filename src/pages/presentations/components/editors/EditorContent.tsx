import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { ComboOptionConstant } from '~/configs/constants';
import { usePresentationContext } from '../../PresentationDetailPage';
import { SlideDto, SlideType } from '../../types/slide';
import EditorHeadingSlide from './EditorHeadingSlide';
import EditorMultipleChoiceSlide from './EditorMultipleChoice';
import EditorParagraphSlide from './EditorParagraphSlide';
import EditorBulletSlide from './EditorBulletSlide';
import EditorWordCloud from './EditorWordCloud';
import EditorQuoteSlide from './EditorQuoteSlide';

interface Props {}

const EditorContent: React.FC<Props> = () => {
    const { currentSlideId, slides, onUpdatePresentation } = usePresentationContext();
    const slide = slides.find(x => x.slideID === currentSlideId) || ({} as SlideDto);

    const renderEditorType = () => {
        switch (slide?.type) {
            case 'HEADING':
                return <EditorHeadingSlide slide={slide} slides={slides} onUpdatePresentation={onUpdatePresentation} />;
            case 'PARAGRAPH':
                return (
                    <EditorParagraphSlide slide={slide} slides={slides} onUpdatePresentation={onUpdatePresentation} />
                );
            case 'MULTIPLE_CHOICE':
                return (
                    <EditorMultipleChoiceSlide
                        slide={slide}
                        slides={slides}
                        onUpdatePresentation={onUpdatePresentation}
                    />
                );
            case 'BULLET_LIST':
                return <EditorBulletSlide slide={slide} slides={slides} onUpdatePresentation={onUpdatePresentation} />;
            case 'WORD_CLOUD':
                return <EditorWordCloud slide={slide} slides={slides} onUpdatePresentation={onUpdatePresentation} />;
            case 'QUOTE':
                return <EditorQuoteSlide slide={slide} slides={slides} onUpdatePresentation={onUpdatePresentation} />;
            case null:
            default:
                return null;
        }
    };

    const handleChangeSlideType = (type: string) => {
        const newSlide = _.cloneDeep(slide);
        const currentSlideIndex = slides.findIndex(x => x.slideID === currentSlideId);
        slides[currentSlideIndex] = {
            ...newSlide,
            type: type as SlideType,
            question: newSlide.heading || newSlide.question,
            heading: newSlide.heading || newSlide.question,
            paragraph: newSlide.subHeading,
            subHeading: newSlide.paragraph,
        };

        onUpdatePresentation({
            slides: slides,
        });
    };

    return (
        <>
            <div className="w-full h-14 px-4 flex items-center justify-between border-b border-neutral-100">
                <div className="font-bold text-xl">Nội dung</div>
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
                                onChange={event => handleChangeSlideType(event.target.value)}
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
        </>
    );
};

export default EditorContent;
