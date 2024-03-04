import { Grid, Stack } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import BaseIcon from '~/components/icons/BaseIcon';
import { PresentationDto } from '~/pages/presentations/types/presentation';
import TemplateItem from './TemplateItem';

export interface Props {
    templates: PresentationDto[];
    onDetail: (data: PresentationDto) => void;
    onCreatePresent: (data: PresentationDto) => void;
}

const TemplateList: React.FC<Props> = ({ templates, onDetail, onCreatePresent }) => {
    return (
        <Stack useFlexGap gap={2}>
            <Grid
                container
                spacing={3}
                sx={{
                    position: 'relative',
                }}
            >
                {templates.map(item => {
                    return (
                        <Grid key={item.presentationID} item xs={12} sm={6} md={4}>
                            <Stack direction="column">
                                <div
                                    className="cursor-pointer select-none relative group"
                                    onClick={() => onDetail(item)}
                                >
                                    <TemplateItem slide={item.slides?.[0]} />
                                    <div className="mt-2">
                                        <div className="text-neutral-800 text-lg line-clamp-1">{item.name}</div>
                                        <div className="text-sm text-neutral-500 line-clamp-1">
                                            {item.slides?.length || 0} slides
                                        </div>
                                    </div>
                                    <div
                                        className={clsx('absolute  hidden group-hover:!flex gap-x-2')}
                                        style={{
                                            right: 10,
                                            bottom: 66,
                                        }}
                                    >
                                        <div
                                            className={clsx(
                                                'rounded-full h-8 text-13px border-2 border-indigo-main bg-indigo-main',
                                                'flex items-center justify-center transition-all duration-200 ease-in-out',
                                                'text-white hover:bg-white hover:text-indigo-main px-3',
                                            )}
                                            onClick={() => onDetail(item)}
                                        >
                                            Xem trước
                                        </div>
                                        <div
                                            className={clsx(
                                                'rounded-full h-8 text-xs border-2 border-indigo-main bg-indigo-main',
                                                'flex items-center justify-center transition-all duration-200 ease-in-out',
                                                'text-white hover:bg-white hover:text-indigo-main px-3',
                                            )}
                                            onClick={() => onCreatePresent(item)}
                                        >
                                            <BaseIcon type="add" size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Stack>
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
};

export default TemplateList;
