import { FormControl, FormLabel } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import BaseTextField from '~/components/forms/fields/BaseTextField';
import { EditorSlideProps } from './EditorContent';

interface Props extends EditorSlideProps {}

const EditorQuoteSlide: React.FC<Props> = ({ slide, control, slides, onUpdatePresentation }) => {
    if (slide.type !== 'QUOTE') return null;

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
                    Trích dẫn
                </FormLabel>
                <BaseTextField
                    name="quote"
                    control={control}
                    defaultValue={slide.quote}
                    value={slide.quote}
                    classNameCol="col-span-12"
                    variant="outlined"
                    size="small"
                    placeholder="Trích dẫn..."
                    rows={3}
                    multiline
                    onChange={event => handleChange('quote', event.target.value)}
                />
            </FormControl>
            <div className="my-2" />
            <FormControl fullWidth>
                <FormLabel
                    style={{
                        marginBottom: 10,
                        fontWeight: 600,
                    }}
                >
                    Tác giả
                </FormLabel>
                <BaseTextField
                    name="author"
                    control={control}
                    defaultValue={slide.author}
                    value={slide.author}
                    classNameCol="col-span-12"
                    variant="outlined"
                    size="small"
                    placeholder="Tác giả..."
                    onChange={event => handleChange('author', event.target.value)}
                />
            </FormControl>
        </>
    );
};

export default EditorQuoteSlide;
