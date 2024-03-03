import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { ComboOptionConstant } from '~/configs/constants';
import EditorBulletSlide from '~/pages/presentations/components/editors/EditorBulletSlide';
import EditorHeadingSlide from '~/pages/presentations/components/editors/EditorHeadingSlide';
import EditorMultipleChoiceSlide from '~/pages/presentations/components/editors/EditorMultipleChoice';
import EditorParagraphSlide from '~/pages/presentations/components/editors/EditorParagraphSlide';
import EditorQuoteSlide from '~/pages/presentations/components/editors/EditorQuoteSlide';
import EditorWordCloud from '~/pages/presentations/components/editors/EditorWordCloud';
import { SlideDto, SlideType } from '~/pages/presentations/types/slide';
import { useTemplateCreateContext } from '../TemplateCreatePage';
import { EditorSlideProps } from '~/pages/presentations/components/editors/EditorContent';

interface Props {}

const TemplateCreateEditorContent: React.FC<Props> = () => {
    const { currentSlideId, slides, onUpdatePresentation, increaseBackStep } = useTemplateCreateContext();
    const slide = slides.find(x => x.slideID === currentSlideId) || ({} as SlideDto);

    const renderEditorType = () => {
        const slideProps: EditorSlideProps = {
            slide,
            slides,
            onUpdatePresentation,
            increaseBackStep,
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

export default TemplateCreateEditorContent;
