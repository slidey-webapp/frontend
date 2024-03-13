import { FormControl, FormLabel, TextField } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import { ButtonIconBase } from '~/components/buttons/ButtonIconBase';
import { BulletSlideItem, SlideDto } from '../../types/slide';
import { EditorSlideProps } from './EditorContent';

interface Props extends EditorSlideProps {}

const EditorBulletSlide: React.FC<Props> = ({ slide, slides, onUpdatePresentation, increaseBackStep, mask, unmask }) => {
    if (slide.type !== 'BULLET_LIST') return null;

    const handleUpdateSlide = async (newSlide: SlideDto) => {
        const currentSlideIndex = slides.findIndex(x => x.slideID === slide.slideID);

        slides[currentSlideIndex] = newSlide;

        mask?.();
        await onUpdatePresentation({
            slides: slides,
        });
        unmask?.();
    };

    const handleChangeHeading = _.debounce((value: string) => {
        const newSlide = {
            ..._.cloneDeep(slide),
            heading: value,
        };
        handleUpdateSlide(newSlide);
    }, 200);

    const handleAddItem = () => {
        const items = _.cloneDeep(slide.items) || [];
        items.push({
            value: 'Lựa chọn ' + items.length,
        } as BulletSlideItem);

        const newSlide = {
            ..._.cloneDeep(slide),
            items,
        };
        handleUpdateSlide(newSlide);
    };

    const handleRemoveItem = (index: number) => {
        const items = _.cloneDeep(slide.items);
        items.splice(index, 1);

        const newSlide = {
            ..._.cloneDeep(slide),
            items,
        };
        handleUpdateSlide(newSlide);
    };

    const handleUpdateItem = _.debounce((index: number, value: string) => {
        const items = _.cloneDeep(slide.items);

        items[index] = {
            ...items[index],
            value: value,
        };

        const newSlide = {
            ..._.cloneDeep(slide),
            items,
        };
        handleUpdateSlide(newSlide);
    }, 200);

    const renderItems = () => {
        return (slide.items || []).map((item, index) => {
            return (
                <div key={item.bulletListSlideItemID}className="w-full flex items-center justify-between">
                    <FormControl sx={{ minWidth: 150 }} size="small">
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder={'Lựa chọn ' + index}
                            defaultValue={item.value}
                            onChange={event => handleUpdateItem(index, event.target.value)}
                        />
                    </FormControl>
                    <ButtonIconBase
                        className="!ml-2"
                        icon="remove"
                        color="error"
                        onClick={() => handleRemoveItem(index)}
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
                    Tiêu đề
                </FormLabel>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Tiêu đề"
                    defaultValue={slide.heading}
                    onChange={event => handleChangeHeading(event.target.value)}
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
                    {renderItems()}
                    <ButtonBase title="Thêm lựa chọn" startIcon="add" color="primary" onClick={handleAddItem} />
                </div>
            </FormControl>
        </>
    );
};

export default EditorBulletSlide;
