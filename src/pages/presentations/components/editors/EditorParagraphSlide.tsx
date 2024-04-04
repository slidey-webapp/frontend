import { FormControl, FormLabel } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import BaseTextField from '~/components/forms/fields/BaseTextField';
import { EditorSlideProps } from './EditorContent';

interface Props extends EditorSlideProps {}

const EditorParagraphSlide: React.FC<Props> = ({ slide, slides, control, onUpdatePresentation }) => {
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
                <BaseTextField
                    name="heading"
                    control={control}
                    defaultValue={slide.heading}
                    value={slide.heading}
                    classNameCol="col-span-12"
                    variant="outlined"
                    size="small"
                    placeholder="Tiêu đề..."
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
                    Tiêu đề phụ
                </FormLabel>
                <BaseTextField
                    name="paragraph"
                    control={control}
                    defaultValue={slide.paragraph}
                    value={slide.paragraph}
                    classNameCol="col-span-12"
                    variant="outlined"
                    placeholder="Văn bản..."
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
