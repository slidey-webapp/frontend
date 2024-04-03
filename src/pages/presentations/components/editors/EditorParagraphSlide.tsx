import { FormControl, FormLabel, TextField } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { EditorSlideProps } from './EditorContent';

interface Props extends EditorSlideProps {}

const EditorParagraphSlide: React.FC<Props> = ({ slide, slides, onUpdatePresentation }) => {
    if (slide.type !== 'PARAGRAPH') return null;

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

        return '';
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
                    Tiêu đề
                </FormLabel>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Heading"
                    defaultValue={slide.heading}
                    onChange={event => handleChange('heading', event.target.value)}
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
