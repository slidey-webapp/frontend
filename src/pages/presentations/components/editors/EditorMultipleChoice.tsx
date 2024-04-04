import { FormControl, FormLabel } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import BaseTextField from '~/components/forms/fields/BaseTextField';
import { MultipleChoiceSlideOption, SlideDto } from '../../types/slide';
import { EditorSlideProps } from './EditorContent';
interface Props extends EditorSlideProps {}

const EditorMultipleChoiceSlide: React.FC<Props> = ({
    slide,
    slides,
    control,
    onUpdatePresentation,
    mask,
    unmask,
    fetchUpdatePresentation,
}) => {
    if (slide.type !== 'MULTIPLE_CHOICE') return null;

    const handleUpdateOptionsSlide = async (newSlide: SlideDto) => {
        const currentSlideIndex = slides.findIndex(x => x.slideID === slide.slideID);

        slides[currentSlideIndex] = newSlide;

        mask?.();
        await fetchUpdatePresentation({
            slides: slides,
        });
        unmask?.();
    };

    const handleUpdateSlide = (newSlide: SlideDto) => {
        const currentSlideIndex = slides.findIndex(x => x.slideID === slide.slideID);

        slides[currentSlideIndex] = newSlide;

        onUpdatePresentation({
            slides: slides,
        });
    };

    const handleChangeQuestion = (value: string) => {
        const newSlide = {
            ..._.cloneDeep(slide),
            question: value,
        };
        handleUpdateSlide(newSlide);
    };

    const handleAddOption = () => {
        const options = _.cloneDeep(slide.options || []);
        options.push({
            option: 'Lựa chọn ' + options.length,
        } as MultipleChoiceSlideOption);

        const newSlide = {
            ..._.cloneDeep(slide),
            options,
        };
        handleUpdateOptionsSlide(newSlide);
    };

    const handleRemoveOption = (index: number) => {
        const options = _.cloneDeep(slide.options);
        options.splice(index, 1);

        const newSlide = {
            ..._.cloneDeep(slide),
            options,
        };
        handleUpdateOptionsSlide(newSlide);
    };

    const handleUpdateOption = (index: number, value: string) => {
        const options = _.cloneDeep(slide.options);

        options[index] = {
            ...options[index],
            option: value,
        };

        const newSlide = {
            ..._.cloneDeep(slide),
            options,
        };
        handleUpdateSlide(newSlide);
    };

    const renderOptions = () => {
        return (slide.options || []).map((option, index) => {
            return (
                <div key={option.optionID} className="w-full flex items-center justify-between">
                    <FormControl sx={{ minWidth: 150 }} size="small">
                        <BaseTextField
                            name={`options[${index}].option`}
                            control={control}
                            variant="outlined"
                            size="small"
                            placeholder={'Lựa chọn ' + index + '...'}
                            defaultValue={option.option}
                            value={option.option}
                            classNameCol="col-span-12"
                            onChange={event => handleUpdateOption(index, event.target.value)}
                        />
                    </FormControl>
                    <ButtonIconBase
                        className="!ml-2"
                        icon="remove"
                        color="error"
                        onClick={() => handleRemoveOption(index)}
                    />
                </div>
            );
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
                    onChange={event => handleChangeQuestion(event.target.value)}
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
                    Các lựa chọn
                </FormLabel>
                <div className="w-full flex flex-col gap-y-3">
                    {renderOptions()}
                    <ButtonBase title="Thêm lựa chọn" startIcon="add" color="primary" onClick={handleAddOption} />
                </div>
            </FormControl>
        </>
    );
};

export default EditorMultipleChoiceSlide;
