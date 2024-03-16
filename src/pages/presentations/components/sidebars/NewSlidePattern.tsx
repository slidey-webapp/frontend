import { Popover } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import bulletSrc from '~/images/slide/bullet.svg';
import headingSrc from '~/images/slide/heading.svg';
import multipleChoiceSrc from '~/images/slide/multiple-choice.svg';
import paragraphSrc from '~/images/slide/paragraph.svg';
import quoteSrc from '~/images/slide/quote.svg';
import wordCloudSrc from '~/images/slide/word-cloud.svg';
import { requestApi } from '~/libs/axios';
import { ChartType, HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { usePresentationContext } from '../../PresentationDetailPage';
import { PRESENTATION_CREATE_SLIDE_API } from '../../api/presentation.api';
import { SlideDto, SlideType } from '../../types/slide';

interface Props {}

type SlideGroup = 'Slide tương tác' | 'Slide nội dung';

export interface SlidePattern {
    name: string;
    type: SlideType;
    src: string;
}

export const slidesGroup: {
    title: SlideGroup;
    patterns: SlidePattern[];
}[] = [
    {
        title: 'Slide nội dung',
        patterns: [
            {
                name: 'Tiêu đề',
                type: 'HEADING',
                src: headingSrc,
            },
            {
                name: 'Văn bản',
                type: 'PARAGRAPH',
                src: paragraphSrc,
            },
            {
                name: 'Danh sách',
                type: 'BULLET_LIST',
                src: bulletSrc,
            },
            {
                name: 'Trích dẫn',
                type: 'QUOTE',
                src: quoteSrc,
            },
        ],
    },
    {
        title: 'Slide tương tác',
        patterns: [
            {
                name: 'Lựa chọn',
                type: 'MULTIPLE_CHOICE',
                src: multipleChoiceSrc,
            },
            {
                name: 'Word Cloud',
                type: 'WORD_CLOUD',
                src: wordCloudSrc,
            },
        ],
    },
];

export const SlidePatternItem = ({
    item,
    className,
    onClick,
}: {
    item: SlidePattern;
    className: string;
    onClick: () => void;
}) => {
    return (
        <div className={clsx('w-32 h-20', className)}>
            <div
                className={clsx(
                    'flex-1 h-full border-2 p-2 bg-white flex items-center justify-center border-neutral-100 rounded ',
                    'cursor-pointer transition-all duration-200 ease-in-out hover:border-neutral-300',
                )}
                onClick={onClick}
            >
                <div className="flex flex-col items-center justify-center">
                    <img src={item.src} alt={item.name} width={28} height={28} />
                    <div className="text-sm text-neutral-500">{item.name}</div>
                </div>
            </div>
        </div>
    );
};

const NewSlidePattern: React.FC<Props> = () => {
    const { presentationID, mask, unmask, setState } = usePresentationContext();

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
        mask();
        const response = await requestApi<SlideDto>('post', PRESENTATION_CREATE_SLIDE_API, {
            presentationID,
            type,
            horizontalAlignment: HorizontalAlignment.Left,
            verticalAlignment: VerticalAlignment.Top,
            textSize: TextSize.Medium,
            textColor: '#000000',
            textBackground: '#ffffff',
            chartType: ChartType.Bar,
            layout: 'Default',
        } as SlideDto);

        if (response.status === 200) {
            const slide = response.data?.result;
            unmask();
            handleClose();

            if (!slide) return;

            setState(pre => ({
                ...pre,
                currentSlideId: slide?.slideID,
                slides: [...pre.slides, slide],
            }));

            return;
        }

        unmask();
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

export default NewSlidePattern;
