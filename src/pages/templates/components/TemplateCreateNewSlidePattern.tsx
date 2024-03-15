import { Popover } from '@mui/material';
import React from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import { SlidePatternItem, slidesGroup } from '~/pages/presentations/components/sidebars/NewSlidePattern';
import { SlideDto, SlideType } from '~/pages/presentations/types/slide';
import { ChartType, HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { useTemplateCreateContext } from '../TemplateCreatePage';

interface Props {}

const TemplateCreateNewSlidePattern: React.FC<Props> = () => {
    const { slides, onUpdatePresentation } = useTemplateCreateContext();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'new-slide-pattern-popover' : undefined;

    const handleCreateSlide = async (type: SlideType) => {
        onUpdatePresentation({
            slides: [
                ...slides,
                {
                    slideID: Math.random(),
                    type,
                    horizontalAlignment: HorizontalAlignment.Left,
                    verticalAlignment: VerticalAlignment.Top,
                    textSize: TextSize.Medium,
                    textColor: '#000000',
                    textBackground: '#ffffff',
                    chartType: ChartType.Bar,
                    slideOrder: slides.length + 1,
                    options: [] as any[],
                    items: [] as any[],
                } as SlideDto,
            ],
        });
        handleClose()
    };

    return (
        <>
            <ButtonBase
                onClick={handleClick}
                color={'success'}
                title="Thêm slide"
                startIcon={'add'}
                className="w-full"
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className="flex flex-col p-4">
                    {slidesGroup.map(group => {
                        return (
                            <div key={group.title} className="mt-4">
                                <div className="mb-2 font-semibold text-base text-neutral-900">{group.title}</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {group.patterns.map(pattern => {
                                        return (
                                            <SlidePatternItem
                                                key={pattern.name}
                                                item={pattern}
                                                className={'col-span-1'}
                                                onClick={() => handleCreateSlide(pattern.type)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Popover>
        </>
    );
};

export default TemplateCreateNewSlidePattern;
