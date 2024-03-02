import { FormControl, FormLabel, TextField } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryUtil from '~/utils/HistoryUtil';
import { IPresentationContext, usePresentationContext } from '../../PresentationDetailPage';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
    slides: SlideDto[];
    onUpdatePresentation: IPresentationContext['onUpdatePresentation'];
}

const EditorHeadingSlide: React.FC<Props> = ({ slide, slides, onUpdatePresentation }) => {
    if (slide.type !== 'HEADING') return null;

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
            <FormControl fullWidth key={slide.subHeading}>
                <FormLabel
                    style={{
                        marginBottom: 10,
                        fontWeight: 600,
                    }}
                >
                    Tiêu đề phụ
                </FormLabel>
                <TextField
                    variant="outlined"
                    defaultValue={slide.subHeading}
                    placeholder="Subheading"
                    size="small"
                    multiline
                    rows={3}
                    onChange={event => handleChange('subHeading', event.target.value)}
                />
            </FormControl>
        </>
    );
};

export default EditorHeadingSlide;
