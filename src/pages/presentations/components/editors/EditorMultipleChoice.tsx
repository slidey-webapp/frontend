import { FormControl, FormLabel, TextField } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import { MultipleChoiceSlideOption, SlideDto } from '../../types/slide';
import { EditorSlideProps } from './EditorContent';
interface Props extends EditorSlideProps {}

const EditorMultipleChoiceSlide: React.FC<Props> = ({
    slide,
    slides,
    onUpdatePresentation,
    increaseBackStep,
    mask,
    unmask,
}) => {
    if (slide.type !== 'MULTIPLE_CHOICE') return null;

    const handleUpdateSlide = async (newSlide: SlideDto) => {
        const currentSlideIndex = slides.findIndex(x => x.slideID === slide.slideID);

        slides[currentSlideIndex] = newSlide;

        mask?.();
        await onUpdatePresentation({
            slides: slides,
        });
        unmask?.();
    };

    const handleChangeQuestion = _.debounce((value: string) => {
        const newSlide = {
            ..._.cloneDeep(slide),
            question: value,
        };
        handleUpdateSlide(newSlide);
    }, 350);

    const handleAddOption = () => {
        const options = _.cloneDeep(slide.options);
        options.push({
            option: 'Lựa chọn ' + options.length,
        } as MultipleChoiceSlideOption);

        const newSlide = {
            ..._.cloneDeep(slide),
            options,
        };
        handleUpdateSlide(newSlide);
    };

    const handleRemoveOption = (index: number) => {
        const options = _.cloneDeep(slide.options);
        options.splice(index, 1);

        const newSlide = {
            ..._.cloneDeep(slide),
            options,
        };
        handleUpdateSlide(newSlide);
    };

    const handleUpdateOption = _.debounce((index: number, value: string) => {
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
    }, 350);

    const renderOptions = () => {
        return (slide.options || []).map((option, index) => {
            return (
                <div key={index} className="w-full flex items-center justify-between">
                    <FormControl sx={{ minWidth: 150 }} size="small">
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder={'Lựa chọn ' + index}
                            defaultValue={option.option}
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
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Câu hỏi"
                    defaultValue={slide.question}
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
