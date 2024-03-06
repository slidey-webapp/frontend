import { Box, Grid, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from '~/AppStore';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import { AppContainer } from '~/components/layouts/AppContainer';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import bulletSrc from '~/images/slide/bullet.svg';
import headingSrc from '~/images/slide/heading.svg';
import multipleChoiceSrc from '~/images/slide/multiple-choice.svg';
import paragraphSrc from '~/images/slide/paragraph.svg';
import quoteSrc from '~/images/slide/quote.svg';
import wordCloudSrc from '~/images/slide/word-cloud.svg';
import { PaginatedList, requestApi } from '~/libs/axios';
import { indigo, neutral } from '~/themes/colors';
import { Id } from '~/types/shared';
import DateTimeUtil from '~/utils/DateTimeUtil';
import NotifyUtil from '~/utils/NotifyUtil';
import GroupForm from '../groups/components/GroupForm';
import { PRESENTATION_CREATE_API } from '../presentations/api/presentation.api';
import { PresentationDto } from '../presentations/types/presentation';
import { SlideDto } from '../presentations/types/slide';
import TemplateList from '../templates/components/TemplateList';
import { VISIT_HISTORY_API } from './api/home.api';
import SkeletonGrids from './components/SkeletonGrids';
import { HistoryDto } from './types/history';

export interface Props {}

const getDisplayTime = (time?: Date) => {
    if (!time) {
        return '';
    }
    const now = DateTimeUtil.convertDateFromUtcDate(new Date());
    const removeUtc = DateTimeUtil.convertDateFromUtcDate(time);
    const timeDiff = Math.floor((now.getTime() - removeUtc.getTime()) / 1000);
    if (timeDiff < 60) {
        return '1 phút trước';
    } else if (timeDiff < 3600) {
        const minutes = Math.floor(timeDiff / 60);
        return `${minutes} phút trước`;
    } else if (timeDiff < 86400) {
        const hours = Math.floor(timeDiff / 3600);
        return `${hours} giờ trước`;
    } else {
        return DateTimeUtil.formatDateTime(removeUtc, DateTimeUtil.VN_DATE_FORMAT);
    }
};

const DashboardHomePage: React.FC<Props> = () => {
    const navigate = useNavigate();

    const { authUser } = useAppSelector((state: RootState) => state.auth);
    const modalRef = useRef<ModalBaseRef>(null);
    const [recentVisitedItem, setRecentVisitedItem] = useState<HistoryDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDetailPresentation = async (presentationID: Id) => navigate('/presentation/edit/' + presentationID);

    const handleCreatePresentation = async () => {
        modalRef.current?.onOpen(
            <TemplateList
                renderAddonBeforeItem={() => {
                    return (
                        <Grid item xs={12} sm={6} md={4}>
                            <Stack direction="column">
                                <div className="cursor-pointer select-none relative group" onClick={handleCreateEmpty}>
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
                                        <div className={'w-full h-full flex flex-col items-center justify-center'} />
                                    </Box>
                                    <div className="mt-2">
                                        <div className="text-neutral-800 text-lg line-clamp-1">
                                            Bài trình chiếu trống
                                        </div>
                                        <div className="text-sm text-neutral-500 line-clamp-1 text-transparent">0</div>
                                    </div>
                                </div>
                            </Stack>
                        </Grid>
                    );
                }}
            />,
            'Tất cả mẫu',
            '80%',
        );
    };

    const handleCreateEmpty = async () => {
        const response = await requestApi<{
            presentation: PresentationDto;
            slides: [];
        }>('post', PRESENTATION_CREATE_API, {
            name: 'Bài trình chiếu chưa có tiêu đề',
        });
        modalRef.current?.onClose();

        if (response.status !== 200) {
            NotifyUtil.error(response.data.message || 'Có lỗi xảy ra');
            return;
        }

        response.data.result?.presentation?.presentationID &&
            handleDetailPresentation(response.data.result?.presentation?.presentationID);
    };

    const handleCreateNewGroup = () => {
        modalRef.current?.onOpen(
            <GroupForm
                modalType="create"
                onClose={modalRef.current.onClose}
                onSuccess={() => {
                    NotifyUtil.success('Tạo mới nhóm thành công');
                    navigate('/dashboard/group');
                }}
            />,
            'Tạo mới nhóm',
            '50%',
        );
    };

    const fetchVisitHistory = async () => {
        setIsLoading(true);
        const response = await requestApi<PaginatedList<HistoryDto>>(
            'get',
            VISIT_HISTORY_API,
            {},
            {
                params: {},
            },
        );

        if (response.status === 200 && response.data?.result) {
            setRecentVisitedItem(response.data?.result.items || []);
        }
        setIsLoading(false);
    };

    const renderSlide = (slide?: SlideDto) => {
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
                <div className="flex-1 text-sm font-semibold mt-1">
                    <div className="line-clamp-2">{heading}</div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        fetchVisitHistory();
    }, []);

    return (
        <AppContainer>
            <Stack
                direction="column"
                justifyContent="flex-start"
                sx={{
                    paddingY: 3,
                }}
                gap={6}
                useFlexGap
            >
                <Stack direction="column" justifyContent="flex-start" gap={3} useFlexGap>
                    <Typography component="h4" variant="h4">
                        Xin chào, {authUser?.user.fullname}
                    </Typography>
                    <Stack direction="row" justifyContent="flex-start" gap={2} useFlexGap>
                        <ButtonBase
                            onClick={handleCreatePresentation}
                            color={'success'}
                            title="Tạo bài trình chiếu mới"
                            startIcon={'add'}
                            className="!mx-1"
                            size="large"
                        />

                        <ButtonBase
                            onClick={handleCreateNewGroup}
                            color={'secondary'}
                            title="Tạo nhóm mới"
                            startIcon={'add'}
                            className="!mx-1"
                            size="large"
                        />
                    </Stack>
                </Stack>

                <Stack useFlexGap gap={2}>
                    <Typography component="h6" variant="h6">
                        Đã xem gần đây
                    </Typography>

                    <Grid
                        container
                        spacing={3}
                        sx={{
                            position: 'relative',
                        }}
                    >
                        {isLoading && <SkeletonGrids />}
                        {recentVisitedItem
                            .filter(x => x.asset?.firstSlide)
                            .map(item => {
                                return (
                                    <Grid key={item.visitHistoryID} item xs={12} sm={6} md={4} lg={3}>
                                        <Stack direction="column">
                                            <Box
                                                sx={{
                                                    padding: '1rem',
                                                    borderRadius: '8px',
                                                    transition: 'all .3s',
                                                    cursor: 'pointer',
                                                    borderWidth: 2,
                                                    borderColor: _.get(neutral, '100'),
                                                    borderStyle: 'solid',
                                                    '&:hover': {
                                                        borderColor: _.get(indigo, 'main'),
                                                    },
                                                    marginBottom: '0.5rem',
                                                    aspectRatio: '16 / 9',
                                                }}
                                                onClick={() => handleDetailPresentation(item.assetID)}
                                            >
                                                {renderSlide(item.asset?.firstSlide)}
                                            </Box>
                                            <Typography
                                                component="p"
                                                variant="subtitle1"
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => handleDetailPresentation(item.assetID)}
                                            >
                                                {item.asset.name}
                                            </Typography>
                                            <Typography component="p" variant="body2">
                                                Truy cập lần cuối {getDisplayTime(item.updatedAt)}
                                            </Typography>
                                            {/* <Typography component="p" variant="body2">
                                            Cập nhật lần cuối {getDisplayTime(item.asset.updatedAt)}
                                        </Typography> */}
                                        </Stack>
                                    </Grid>
                                );
                            })}
                    </Grid>
                </Stack>
            </Stack>
            <ModalBase ref={modalRef} />
        </AppContainer>
    );
};

export default DashboardHomePage;
