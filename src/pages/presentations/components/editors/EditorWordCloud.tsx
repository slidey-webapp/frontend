import { FormControl, FormLabel, TextField } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { EditorSlideProps } from './EditorContent';

interface Props extends EditorSlideProps {}

const EditorWordCloud: React.FC<Props> = ({ slide, slides, onUpdatePresentation, increaseBackStep }) => {
    if (slide.type !== 'WORD_CLOUD') return null;

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
                />
            </FormControl>
        </>
    );
};

export default EditorWordCloud;
