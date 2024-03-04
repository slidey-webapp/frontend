import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbRef } from '~/components/bread-crumb/BreadCrumb';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import { AppContainer } from '~/components/layouts/AppContainer';
import Loading from '~/components/loadings/Loading';
import { ComboOptionConstant } from '~/configs/constants';
import { PaginatedList, requestApi } from '~/libs/axios';
import { PresentationDto } from '../presentations/types/presentation';
import { SlideDto, SlideType } from '../presentations/types/slide';
import { TEMPLATE_INDEX_API } from './api/template.api';
import TemplateItem from './components/TemplateItem';
import TemplateList from './components/TemplateList';
import Overlay, { OverlayRef } from '~/components/loadings/Overlay';
import { PRESENTATION_CREATE_API } from '../presentations/api/presentation.api';
import NotifyUtil from '~/utils/NotifyUtil';

interface Props {}

const TemplatePage: React.FC<Props> = () => {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState<PresentationDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [chosen, setChosen] = useState<PresentationDto | null>(null);

    const overlayRef = useRef<OverlayRef>(null);
    const breadcrumbRef = useRef<BreadcrumbRef>(null);

    useEffect(() => {
        const fetchTemplates = () => {
            requestApi<PaginatedList<PresentationDto>>('get', TEMPLATE_INDEX_API, null, {
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
        fetchTemplates();
    }, []);

    const handleCreate = () => {
        navigate('/template/create');
    };

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
            navigate('/presentation/edit/' + response.data.result?.presentation?.presentationID);
    };

    const renderBody = () => {
        if (isLoading) return <Loading />;
        if (chosen) {
            const slideTypes = new Set<SlideType>();
            chosen.slides?.forEach(slide => slideTypes.add(slide.type));

            return (
                <div className="flex gap-x-6 w-full">
                    <div className="flex-1 sticky h-full top-0 bg-white">
                        <div className="w-full">
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

        return <TemplateList templates={templates} onDetail={handleDetail} onCreatePresent={handleCreatePresent} />;
    };

    return (
        <AppContainer className="flex flex-col overflow-hidden" breadcrumbRef={breadcrumbRef}>
            <div className="flex items-center justify-end gap-x-2.5 w-full h-fit min-h-[40px] mb-7">
                {chosen !== null && (
                    <ButtonBase
                        onClick={() => {
                            setChosen(null);
                        }}
                        color={'secondary'}
                        title="Trở về"
                        startIcon={'arrow-back'}
                    />
                )}
                <ButtonBase onClick={handleCreate} color={'success'} title="Tạo mới" startIcon={'add'} />
            </div>
            <div className="base-grid p-7 flex-1 relative overflow-x-hidden overflow-y-auto">{renderBody()}</div>
            <Overlay ref={overlayRef} />
        </AppContainer>
    );
};

export default TemplatePage;
