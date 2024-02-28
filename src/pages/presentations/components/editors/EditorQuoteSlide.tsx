import { FormControl, FormLabel, TextField } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { IPresentationContext } from '../../PresentationDetailPage';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
    slides: SlideDto[];
    onUpdatePresentation: IPresentationContext['onUpdatePresentation'];
}

const EditorQuoteSlide: React.FC<Props> = ({
    slide,
    slides,
    onUpdatePresentation
}) => {
    if (slide.type !== 'QUOTE') return null;

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
            <FormControl fullWidth key={slide.quote}>
                <FormLabel
                    style={{
                        marginBottom: 10,
                        fontWeight: 600,
                    }}
                >
                    Trích dẫn
                </FormLabel>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Trích dẫn"
                    rows={3}
                    multiline
                    defaultValue={slide.quote}
                    onChange={event => handleChange('quote', event.target.value)}
                />
            </FormControl>
            <div className="my-2" />
            <FormControl fullWidth key={slide.author}>
                <FormLabel
                    style={{
                        marginBottom: 10,
                        fontWeight: 600,
                    }}
                >
                    Tác giả
                </FormLabel>
                <TextField
                    variant="outlined"
                    defaultValue={slide.author}
                    placeholder="Tác giả"
                    size="small"
                    onChange={event => handleChange('author', event.target.value)}
                />
            </FormControl>
        </>
    );
};

export default EditorQuoteSlide;