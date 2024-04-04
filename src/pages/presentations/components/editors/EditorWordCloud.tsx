import { FormControl, FormLabel } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import BaseTextField from '~/components/forms/fields/BaseTextField';
import { EditorSlideProps } from './EditorContent';

interface Props extends EditorSlideProps {}

const EditorWordCloud: React.FC<Props> = ({ slide, slides, control, onUpdatePresentation }) => {
    if (slide.type !== 'WORD_CLOUD') return null;

    const handleChange = (name: string, value: any) => {
        const currentSlideIndex = slides.findIndex(x => x.slideID === slide.slideID);
        const newSlide = {
            ..._.cloneDeep(slide),
            [name]: value,
        };
        slides[currentSlideIndex] = newSlide;

        onUpdatePresentation({
            slides: slides,
        });
    };

    return (
        <>
            <FormControl fullWidth>
                <FormLabel
                    style={{
                        marginBottom: 10,
                        fontWeight: 600,
                    }}
                >
                    Câu hỏi
                </FormLabel>
                <BaseTextField
                    name="question"
                    control={control}
                    defaultValue={slide.question}
                    value={slide.question}
                    classNameCol="col-span-12"
                    variant="outlined"
                    size="small"
                    placeholder="Câu hỏi..."
                    onChange={event => handleChange('question', event.target.value)}
                />
            </FormControl>
        </>
    );
};

export default EditorWordCloud;
