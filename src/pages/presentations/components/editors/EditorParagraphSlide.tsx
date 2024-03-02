import { FormControl, FormLabel, TextField } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { IPresentationContext, usePresentationContext } from '../../PresentationDetailPage';
import { SlideDto } from '../../types/slide';
import { useNavigate } from 'react-router-dom';
import HistoryUtil from '~/utils/HistoryUtil';

interface Props {
    slide: SlideDto;
    slides: SlideDto[];
    onUpdatePresentation: IPresentationContext['onUpdatePresentation'];
}

const EditorParagraphSlide: React.FC<Props> = ({ slide, slides, onUpdatePresentation }) => {
    if (slide.type !== 'PARAGRAPH') return null;

    const navigate = useNavigate();
    const { increaseBackStep } = usePresentationContext();

    const handleChange = _.debounce((name: string, value: any) => {
        const currentSlideIndex = slides.findIndex(x => x.slideID === slide.slideID);
        const newSlide = {
            ..._.cloneDeep(slide),
            [name]: value,
        };
        slides[currentSlideIndex] = newSlide;

        onUpdatePresentation({
            slides: slides,
        });

        return '';
    }, 350);

    return (
        <>
            <FormControl fullWidth key={slide.heading}>
                <FormLabel
                    style={{
                        marginBottom: 10,
                        fontWeight: 600,
                    }}
                >
                    Tiêu đề
                </FormLabel>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Heading"
                    defaultValue={slide.heading}
                    onChange={event => handleChange('heading', event.target.value)}
                    autoFocus={HistoryUtil.getSearchParam('focus') === 'heading'}
                    onFocus={() => {
                        HistoryUtil.pushSearchParams(navigate, {
                            focus: 'heading',
                        });
                        increaseBackStep();
                    }}
                    onBlur={() => {
                        HistoryUtil.clearSearchParamWithKeys(navigate, ['focus']);
                        increaseBackStep();
                    }}
                />
            </FormControl>
            <div className="my-2" />
            <FormControl fullWidth key={slide.paragraph}>
                <FormLabel
                    style={{
                        marginBottom: 10,
                        fontWeight: 600,
                    }}
                >
                    Đoạn văn
                </FormLabel>
                <TextField
                    variant="outlined"
                    defaultValue={slide.paragraph}
                    placeholder="Paragraph"
                    size="small"
                    multiline
                    rows={7}
                    onChange={event => handleChange('paragraph', event.target.value)}
                />
            </FormControl>
        </>
    );
};

export default EditorParagraphSlide;
