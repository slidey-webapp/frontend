import React, { createContext, useContext, useRef, useState } from 'react';
import Overlay, { OverlayRef } from '~/components/loadings/Overlay';
import { ChartType, HorizontalAlignment, Id, TextSize, VerticalAlignment } from '~/types/shared';
import { PlacementHover } from '../presentations/PresentationDetailPage';
import { PresentationDto } from '../presentations/types/presentation';
import { SlideDto } from '../presentations/types/slide';
import TemplateCreateHeader from './components/TemplateCreateHeader';
import TemplateCreateMain from './components/TemplateCreateMain';
import { requestApi } from '~/libs/axios';
import { TEMPLATE_CREATE_API } from './api/template.api';
import _ from 'lodash';
import NotifyUtil from '~/utils/NotifyUtil';

interface Props {}

export interface ITemplateCreateContext {
    presentation: PresentationDto;
    slides: SlideDto[];
    hover: PlacementHover;
    currentSlideId: Id;
    backStep: number;
    increaseBackStep: () => void;
    setHoverState: React.Dispatch<React.SetStateAction<PlacementHover>>;
    setState: React.Dispatch<React.SetStateAction<State>>;
    onUpdatePresentation: (params: { name?: string; slides?: SlideDto[] }) => void;
    setCurrentSlideId: (id: Id) => void;
    onCreateTemplate: () => Promise<void>;
}

export const TemplateCreateContext = createContext<ITemplateCreateContext>({} as ITemplateCreateContext);

export const useTemplateCreateContext = () => useContext<ITemplateCreateContext>(TemplateCreateContext);

interface State {
    presentation: PresentationDto;
    slides: SlideDto[];
    currentSlideId: Id;
    backStep: number;
}

const firstSlideId = Math.random();

const TemplateCreatePage: React.FC<Props> = () => {
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
    });
    const [hoverState, setHoverState] = useState<PlacementHover>({
        verticalAlignment: null,
        horizontalAlignment: null,
        chartType: null,
    });

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
        overlayRef.current?.open()
        const response = await requestApi('post', TEMPLATE_CREATE_API, {
            name: state.presentation.name,
            slides: state.slides.map(x => {
                const cloned = _.cloneDeep(x);
                // @ts-ignore
                delete cloned.slideID;

                return cloned;
            }),
        });
        overlayRef.current?.close()

        if (response.status === 200) {
            NotifyUtil.success('Tạo mẫu thành công!')
            return;
        }

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
            <TemplateCreateContext.Provider
                value={{
                    presentation: state.presentation,
                    slides: state.slides,
                    hover: hoverState,
                    currentSlideId: state.currentSlideId,
                    backStep: state.backStep,
                    increaseBackStep: () => setState(pre => ({ ...pre, backStep: pre.backStep + 1 })),
                    setCurrentSlideId: id => {
                        setState(pre => ({ ...pre, currentSlideId: id }));
                    },
                    setHoverState,
                    setState,
                    onUpdatePresentation: handleUpdatePresentation,
                    onCreateTemplate: handleCreateTemplate,
                }}
            >
                <TemplateCreateHeader />
                <TemplateCreateMain />
            </TemplateCreateContext.Provider>
            <Overlay ref={overlayRef} />
        </div>
    );
};

export default TemplateCreatePage;
