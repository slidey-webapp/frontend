import { FormControl, FormLabel } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import { ButtonIconBase } from '~/components/buttons/ButtonIconBase';
import BaseTextField from '~/components/forms/fields/BaseTextField';
import { BulletSlideItem, SlideDto } from '../../types/slide';
import { EditorSlideProps } from './EditorContent';

interface Props extends EditorSlideProps {}

const EditorBulletSlide: React.FC<Props> = ({
    slide,
    slides,
    control,
    onUpdatePresentation,
    mask,
    unmask,
    fetchUpdatePresentation,
}) => {
    if (slide.type !== 'BULLET_LIST') return null;

    const handleUpdateItemsSlide = async (newSlide: SlideDto) => {
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

    const handleChangeHeading = (value: string) => {
        const newSlide = {
            ..._.cloneDeep(slide),
            heading: value,
        };

        handleUpdateSlide(newSlide);
    };

    const handleAddItem = () => {
        const items = _.cloneDeep(slide.items) || [];
        items.push({
            value: 'Lựa chọn ' + items.length,
        } as BulletSlideItem);

        const newSlide = {
            ..._.cloneDeep(slide),
            items,
        };

        handleUpdateItemsSlide(newSlide);
    };

    const handleRemoveItem = (index: number) => {
        const items = _.cloneDeep(slide.items);
        items.splice(index, 1);

        const newSlide = {
            ..._.cloneDeep(slide),
            items,
        };
        handleUpdateItemsSlide(newSlide);
    };

    const handleUpdateItem = (index: number, value: string) => {
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
    };

    const renderItems = () => {
        return (slide.items || []).map((item, index) => {
            return (
                <div key={item.bulletListSlideItemID} className="w-full flex items-center justify-between">
                    <FormControl sx={{ minWidth: 150 }} size="small">
                        <BaseTextField
                            name={`items[${index}].value`}
                            control={control}
                            variant="outlined"
                            size="small"
                            placeholder={'Lựa chọn ' + index + '...'}
                            defaultValue={item.value}
                            value={item.value}
                            classNameCol="col-span-12"
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
                <BaseTextField
                    name="heading"
                    control={control}
                    defaultValue={slide.heading}
                    value={slide.heading}
                    classNameCol="col-span-12"
                    variant="outlined"
                    size="small"
                    placeholder="Tiêu đề..."
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
