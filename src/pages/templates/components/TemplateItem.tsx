import { Box } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import bulletSrc from '~/images/slide/bullet.svg';
import headingSrc from '~/images/slide/heading.svg';
import multipleChoiceSrc from '~/images/slide/multiple-choice.svg';
import paragraphSrc from '~/images/slide/paragraph.svg';
import quoteSrc from '~/images/slide/quote.svg';
import wordCloudSrc from '~/images/slide/word-cloud.svg';
import { SlideDto } from '~/pages/presentations/types/slide';
import { indigo, neutral } from '~/themes/colors';

interface Props {
    slide?: SlideDto;
    index?: number;
}

const TemplateItem: React.FC<Props> = ({ slide, index }) => {
    if (!slide) return null;
    let src = headingSrc;
    let heading = slide.heading;

    switch (slide.type) {
        case 'MULTIPLE_CHOICE':
            src = multipleChoiceSrc;
            heading = slide.question;
            break;
        case 'PARAGRAPH':
            src = paragraphSrc;
            heading = slide.heading;
            break;
        case 'BULLET_LIST':
            src = bulletSrc;
            heading = slide.heading;
            break;
        case 'WORD_CLOUD':
            src = wordCloudSrc;
            heading = slide.question;
            break;
        case 'QUOTE':
            src = quoteSrc;
            heading = slide.quote;
            break;
        case 'HEADING':
        default:
            src = headingSrc;
            heading = slide.heading;
            break;
    }

    return (
        <Box
            sx={{
                padding: '1rem',
                borderRadius: '8px',
                transition: 'all .3s',
                borderWidth: 2,
                borderColor: _.get(neutral, '100'),
                borderStyle: 'solid',
                '&:hover': {
                    borderColor: _.get(indigo, 'main'),
                },
                aspectRatio: '16 / 9',
                position: 'relative',
            }}
        >
            <div className={'w-full h-full flex flex-col items-center justify-center'}>
                <img
                    src={src}
                    alt={heading}
                    style={{
                        objectFit: 'cover',
                        width: '30%',
                    }}
                    className="flex-1"
                />
                <div className="flex-1 text-lg font-semibold mt-1">
                    <div className="line-clamp-2">{heading}</div>
                </div>
            </div>
            {index && (
                <div
                    className="absolute left-2.5 bottom-2.5 flex items-center justify-center bg-neutral-500 rounded text-white font-bold "
                    style={{
                        height: 36,
                        width: 36,
                    }}
                >
                    {index}
                </div>
            )}
        </Box>
    );
};

export default TemplateItem;
