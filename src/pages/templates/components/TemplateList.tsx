import { Grid, Stack } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseIcon from '~/components/icons/BaseIcon';
import Loading from '~/components/loadings/Loading';
import Overlay, { OverlayRef } from '~/components/loadings/Overlay';
import { ComboOptionConstant } from '~/configs/constants';
import { PaginatedList, baseDeleteWithoutIdApi, requestApi } from '~/libs/axios';
import { PRESENTATION_CREATE_API, PRESENTATION_DELETE_API } from '~/pages/presentations/api/presentation.api';
import { PresentationDto } from '~/pages/presentations/types/presentation';
import { SlideDto, SlideType } from '~/pages/presentations/types/slide';
import NotifyUtil from '~/utils/NotifyUtil';
import { TEMPLATE_INDEX_API } from '../api/template.api';
import TemplateItem from './TemplateItem';

export interface Props {
    renderAddonBeforeItem?: () => JSX.Element;
    allowDelete?: boolean;
    allowCreate?: boolean;
    allowEdit?: boolean;
}

const TemplateList: React.FC<Props> = ({ renderAddonBeforeItem, allowDelete, allowCreate, allowEdit }) => {
    const navigate = useNavigate();

    const [templates, setTemplates] = useState<PresentationDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [chosen, setChosen] = useState<PresentationDto | null>(null);

    const overlayRef = useRef<OverlayRef>(null);

    const fetchTemplates = async () => {
        await requestApi<PaginatedList<PresentationDto>>('get', TEMPLATE_INDEX_API, null, {
            params: {
                offset: 0,
                limit: 10,
            },
        })
            .then(res => {
                if (res.status === 200) {
                    setTemplates(res.data.result?.items || []);
                }
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleDetail = (data: PresentationDto) => {
        setChosen(data);
    };

    const handleCreatePresent = async (data: PresentationDto) => {
        overlayRef.current?.open();
        const response = await requestApi<{
            presentation: PresentationDto;
            slides: SlideDto[];
        }>('post', PRESENTATION_CREATE_API, {
            name: data.name,
            templateID: data.presentationID,
        });
        overlayRef.current?.close();

        if (response.status !== 200) {
            response.data.message && NotifyUtil.error(response.data.message);
            return;
        }

        response.data.result?.presentation?.presentationID &&
            navigate('/presentation/edit/' + response.data.result?.presentation?.presentationID, {
                state: {
                    previousRoute: location.pathname,
                },
            });
    };

    const handleDeleteTemplate = async (data: PresentationDto) => {
        NotifyUtil.confirmDialog('Thông báo', 'Bạn có chắc muốn xóa mẫu này ?').then(async confirm => {
            if (confirm.isConfirmed) {
                overlayRef.current?.open();
                await baseDeleteWithoutIdApi(PRESENTATION_DELETE_API, { presentationID: data.presentationID }, 'post');
                await fetchTemplates();
                overlayRef.current?.close();
            }
        });
    };

    const renderBody = () => {
        if (isLoading)
            return (
                <div
                    className="relative "
                    style={{
                        height: 400,
                        width: '100%',
                    }}
                >
                    <Loading />
                </div>
            );
        if (chosen) {
            const slideTypes = new Set<SlideType>();
            chosen.slides?.forEach(slide => slideTypes.add(slide.type));

            return (
                <div className="flex gap-x-6 w-full">
                    <div className="flex-1 sticky h-full top-0 bg-white">
                        <div className="w-full">
                            <div
                                className={clsx(
                                    'text-xs font-semibold mb-7 flex items-center cursor-pointer text-black',
                                    'transition-all ease-in-out duration-200 hover:text-neutral-500',
                                )}
                                onClick={() => setChosen(null)}
                            >
                                <BaseIcon type="arrow-back" size={14} /> <span className="ml-1">Trở về</span>
                            </div>
                            <div className="text-xl font-semibold mb-3">{chosen.name}</div>
                            <div className="text-xs font-semibold mb-2">Bao gồm các loại slide</div>
                            <div className="flex flex-wrap gap-2">
                                {[...slideTypes].map(type => {
                                    const label = ComboOptionConstant.SLIDE_TYPE.find(x => x.value === type)?.label;
                                    if (!label) return null;

                                    return (
                                        <div
                                            key={type}
                                            className="px-2 h-6 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-500 text-xs"
                                        >
                                            {label}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-7 w-full">
                                <div
                                    className={clsx(
                                        'h-12 px-6 w-fit rounded-full flex items-center justify-center bg-neutral-700 text-white font-semibold',
                                        'cursor-pointer transition-all duration-300 ease-in-out hover:bg-black',
                                    )}
                                    onClick={() => handleCreatePresent(chosen)}
                                >
                                    Dùng mẫu
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-2">
                        <div className="w-full grid grid-cols-2 gap-4 select-none">
                            {chosen.slides?.map((slide, idx) => {
                                return (
                                    <div key={slide.slideID} className="col-span-1">
                                        <TemplateItem slide={slide} index={idx + 1} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <Stack useFlexGap gap={2}>
                <Grid
                    container
                    spacing={3}
                    sx={{
                        position: 'relative',
                    }}
                >
                    {renderAddonBeforeItem?.()}
                    {templates.map(item => {
                        return (
                            <Grid key={item.presentationID} item xs={12} sm={6} md={4}>
                                <Stack direction="column">
                                    <div
                                        className="cursor-pointer select-none relative group"
                                        onClick={() => handleDetail(item)}
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
                                                onClick={() => handleDetail(item)}
                                            >
                                                Xem trước
                                            </div>
                                            {allowCreate && (
                                                <div
                                                    className={clsx(
                                                        'rounded-full h-8 text-xs border-2 border-indigo-main bg-indigo-main',
                                                        'flex items-center justify-center transition-all duration-200 ease-in-out',
                                                        'text-white hover:bg-white hover:text-indigo-main px-3',
                                                    )}
                                                    onClick={() => handleCreatePresent(item)}
                                                >
                                                    <BaseIcon type="add" size={18} />
                                                </div>
                                            )}
                                            {allowEdit && (
                                                <div
                                                    className={clsx(
                                                        'rounded-full h-8 text-xs border-2 border-green-500 bg-green-500',
                                                        'flex items-center justify-center transition-all duration-200 ease-in-out',
                                                        'text-white hover:bg-white hover:text-green-500 px-3',
                                                    )}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        navigate('/template/edit/' + item.presentationID);
                                                    }}
                                                >
                                                    <BaseIcon type="edit" size={18} />
                                                </div>
                                            )}
                                            {allowDelete && (
                                                <div
                                                    className={clsx(
                                                        'rounded-full h-8 text-xs border-2 border-red-500 bg-red-500',
                                                        'flex items-center justify-center transition-all duration-200 ease-in-out',
                                                        'text-white hover:bg-white hover:text-red-500 px-3',
                                                    )}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDeleteTemplate(item);
                                                    }}
                                                >
                                                    <BaseIcon type="delete" size={18} />
                                                </div>
                                            )}
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

    return (
        <>
            {renderBody()}
            <Overlay ref={overlayRef} />
        </>
    );
};

export default TemplateList;
