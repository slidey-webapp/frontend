import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { ComboOptionConstant } from '~/configs/constants';
import { ITemplateCreateContext } from '~/pages/templates/TemplateCreatePage';
import { IPresentationContext, usePresentationContext } from '../../PresentationDetailPage';
import { SlideDto, SlideType } from '../../types/slide';
import EditorBulletSlide from './EditorBulletSlide';
import EditorHeadingSlide from './EditorHeadingSlide';
import EditorMultipleChoiceSlide from './EditorMultipleChoice';
import EditorParagraphSlide from './EditorParagraphSlide';
import EditorQuoteSlide from './EditorQuoteSlide';
import EditorWordCloud from './EditorWordCloud';

interface Props {}

export interface EditorSlideProps {
    slide: SlideDto;
    slides: SlideDto[];
    onUpdatePresentation: IPresentationContext['onUpdatePresentation'] | ITemplateCreateContext['onUpdatePresentation'];
    mask?: () => void;
    unmask?: () => void;
    increaseBackStep: () => void;
}

const EditorContent: React.FC<Props> = () => {
    const { currentSlideId, slides, onUpdatePresentation, mask, increaseBackStep, unmask } = usePresentationContext();
    const slide = slides.find(x => x.slideID === currentSlideId) || ({} as SlideDto);

    const renderEditorType = () => {
        const slideProps: EditorSlideProps = {
            slide,
            slides,
            onUpdatePresentation,
            increaseBackStep,
            mask,
            unmask,
        };

        switch (slide?.type) {
            case 'HEADING':
                return <EditorHeadingSlide {...slideProps} />;
            case 'PARAGRAPH':
                return <EditorParagraphSlide {...slideProps} />;
            case 'MULTIPLE_CHOICE':
                return <EditorMultipleChoiceSlide {...slideProps} />;
            case 'BULLET_LIST':
                return <EditorBulletSlide {...slideProps} />;
            case 'WORD_CLOUD':
                return <EditorWordCloud {...slideProps} />;
            case 'QUOTE':
                return <EditorQuoteSlide {...slideProps} />;
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
