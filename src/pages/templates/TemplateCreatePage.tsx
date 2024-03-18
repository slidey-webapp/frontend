import _ from 'lodash';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '~/components/loadings/Loading';
import Overlay, { OverlayRef } from '~/components/loadings/Overlay';
import { requestApi } from '~/libs/axios';
import { ChartType, HorizontalAlignment, Id, TextSize, VerticalAlignment } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { PlacementHover } from '../presentations/PresentationDetailPage';
import { PRESENTATION_DELETE_API } from '../presentations/api/presentation.api';
import { PresentationDto } from '../presentations/types/presentation';
import { BulletSlideItem, MultipleChoiceSlideOption, SlideDto } from '../presentations/types/slide';
import { TEMPLATE_CREATE_API, TEMPLATE_DETAIL_API } from './api/template.api';
import TemplateCreateHeader from './components/TemplateCreateHeader';
import TemplateCreateMain from './components/TemplateCreateMain';

interface Props {}

export interface ITemplateCreateContext {
    presentation: PresentationDto;
    slides: SlideDto[];
    hover: PlacementHover;
    currentSlideId: Id;
    setHoverState: React.Dispatch<React.SetStateAction<PlacementHover>>;
    setState: React.Dispatch<React.SetStateAction<State>>;
    onUpdatePresentation: (params: { name?: string; slides?: SlideDto[] }) => void;
    setCurrentSlideId: (id: Id) => void;
    onCreateTemplate: () => Promise<void>;
    mask: () => void;
    unmask: () => void;
}

export const TemplateCreateContext = createContext<ITemplateCreateContext>({} as ITemplateCreateContext);

export const useTemplateCreateContext = () => useContext<ITemplateCreateContext>(TemplateCreateContext);

interface State {
    presentation: PresentationDto;
    slides: SlideDto[];
    currentSlideId: Id;
    backStep: number;
    isLoading: boolean;
}

const firstSlideId = Math.random();

const TemplateCreatePage: React.FC<Props> = () => {
    const { presentationID } = useParams<{ presentationID: string }>();
    const navigate = useNavigate();

    const [state, setState] = useState<State>({
        presentation: {
            name: 'Mẫu chưa có tiêu đề',
        } as PresentationDto,
        slides: [
            {
                slideID: firstSlideId,
                type: 'HEADING',
                horizontalAlignment: HorizontalAlignment.Left,
                verticalAlignment: VerticalAlignment.Top,
                textSize: TextSize.Medium,
                textColor: '#000000',
                textBackground: '#ffffff',
                chartType: ChartType.Bar,
                slideOrder: 1,
            } as SlideDto,
        ],
        backStep: 1,
        currentSlideId: firstSlideId,
        isLoading: !!presentationID,
    });

    const [hoverState, setHoverState] = useState<PlacementHover>({
        verticalAlignment: null,
        horizontalAlignment: null,
        chartType: null,
        layout: null,
    });

    useEffect(() => {
        const fetchTemplate = async (id?: Id) => {
            if (!id) return;

            await requestApi<PresentationDto>('get', TEMPLATE_DETAIL_API + '/' + id)
                .then(res => {
                    const result = res.data.result;
                    if (res.status === 200 && result) {
                        setState(pre => ({
                            ...pre,
                            presentation: result,
                            slides: result.slides || [],
                            currentSlideId: result.slides?.[0]?.slideID as Id,
                        }));
                    }
                })
                .finally(() =>
                    setState(pre => ({
                        ...pre,
                        isLoading: false,
                    })),
                );
        };

        fetchTemplate(presentationID);
    }, [presentationID]);

    const overlayRef = useRef<OverlayRef>(null);

    const handleUpdatePresentation = (params: { name?: string; slides?: SlideDto[] }) => {
        setState(pre => ({
            ...pre,
            presentation: {
                ...pre.presentation,
                name: params.name || pre.presentation?.name,
            },
            slides: params.slides || pre.slides,
        }));
    };

    const handleCreateTemplate = async () => {
        overlayRef.current?.open();

        const callbackSuccess = async () => {
            if (!presentationID) return;
            await requestApi('post', PRESENTATION_DELETE_API, { presentationID });
        };

        const response = await requestApi('post', TEMPLATE_CREATE_API, {
            name: state.presentation.name,
            slides: state.slides.map(x => {
                const cloned = _.cloneDeep(x);
                // @ts-ignore
                delete cloned.slideID;

                cloned.items = cloned.items?.map(x => {
                    return {
                        value: x.value,
                    } as BulletSlideItem;
                });

                cloned.options = cloned.options?.map(x => {
                    return {
                        option: x.option,
                    } as MultipleChoiceSlideOption;
                });

                return cloned;
            }),
        });

        if (response.status === 200) {
            NotifyUtil.success('Lưu mẫu thành công!');
            await callbackSuccess();
            navigate('/dashboard/template');
            overlayRef.current?.close();
            return;
        }

        overlayRef.current?.close();

        response.data.message && NotifyUtil.error(response.data.message);
    };

    return (
        <div
            className="w-screen h-screen relative overflow-hidden flex flex-col select-none"
            style={{
                maxWidth: '100vw',
                maxHeight: '100vh',
            }}
        >
            {state.isLoading ? (
                <Loading />
            ) : (
                <TemplateCreateContext.Provider
                    value={{
                        presentation: state.presentation,
                        slides: state.slides,
                        hover: hoverState,
                        currentSlideId: state.currentSlideId,
                        setCurrentSlideId: id => {
                            setState(pre => ({ ...pre, currentSlideId: id }));
                        },
                        setHoverState,
                        setState,
                        onUpdatePresentation: handleUpdatePresentation,
                        onCreateTemplate: handleCreateTemplate,
                        mask: () => overlayRef.current?.open(),
                        unmask: () => overlayRef.current?.close(),
                    }}
                >
                    <TemplateCreateHeader />
                    <TemplateCreateMain />
                </TemplateCreateContext.Provider>
            )}

            <Overlay ref={overlayRef} />
        </div>
    );
};

export default TemplateCreatePage;
