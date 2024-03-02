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

const EditorWordCloud: React.FC<Props> = ({ slide, slides, onUpdatePresentation }) => {
    if (slide.type !== 'WORD_CLOUD') return null;

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
    }, 350);

    return (
        <>
            <FormControl fullWidth key={slide.question}>
                <FormLabel
                    style={{
                        marginBottom: 10,
                        fontWeight: 600,
                    }}
                >
                    Câu hỏi
                </FormLabel>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Câu hỏi"
                    defaultValue={slide.question}
                    onChange={event => handleChange('question', event.target.value)}
                    autoFocus={HistoryUtil.getSearchParam('focus') === 'question'}
                    onFocus={() => {
                        HistoryUtil.pushSearchParams(navigate, {
                            focus: 'question',
                        });
                        increaseBackStep();
                    }}
                    onBlur={() => {
                        HistoryUtil.clearSearchParamWithKeys(navigate, ['focus']);
                        increaseBackStep();
                    }}
                />
            </FormControl>
        </>
    );
};

export default EditorWordCloud;
