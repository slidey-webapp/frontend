import { Tabs, Tab } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BreadcrumbRef } from '~/components/bread-crumb/BreadCrumb';
import { AppContainer } from '~/components/layouts/AppContainer';
import Loading from '~/components/loadings/Loading';
import { Id } from '~/types/shared';
import { useSessionDetail } from './api/useSessionDetail';
import TabPanel from './components/TabPanel';
import ParticipantGrid from './components/ParticipantGrid';
import { BaseGridRef } from '~/components/grid/BaseGrid';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { SESSION_PARTICIPANT_API, SESSION_QUESTION_API } from './api/session.api';
import QuestionGrid from './components/QuestionGrid';
import DateTimeUtil from '~/utils/DateTimeUtil';
import PresentationViewer from './components/PresentationViewer';
import MessageList from './components/MessageList';
import { ParticipantDto } from '../presentations/types/participant';
import { QuestionDto } from '../presentations/types/question';

interface Props {}

enum SESSION_DETAIL_TAB {
    PARTICIPANT = 0,
    SLIDE = 1,
    MESSAGE = 2,
    QUESTION = 3,
}

const SessionDetailPage: React.FC<Props> = () => {
    const breadcrumbRef = useRef<BreadcrumbRef>(null);
    const participantGridRef = useRef<BaseGridRef>(null);
    const questionGridRef = useRef<BaseGridRef>(null);
    const [tab, setTab] = React.useState<SESSION_DETAIL_TAB>(SESSION_DETAIL_TAB.PARTICIPANT);

    const { sessionID } = useParams<{
        sessionID: string;
    }>();

    const participantGridController = useBaseGrid<ParticipantDto>({
        url: SESSION_PARTICIPANT_API,
        gridRef: participantGridRef,
        params: {
            sessionID: sessionID,
        },
    });
    const questionGridController = useBaseGrid<QuestionDto>({
        url: SESSION_QUESTION_API,
        gridRef: questionGridRef,
        params: {
            sessionID: sessionID,
        },
    });
    const { data: responseSession, isFetching: isFetchingSession } = useSessionDetail(sessionID as Id);

    const session = useMemo(() => responseSession?.data?.result?.session, [isFetchingSession]);
    const presentation = useMemo(() => responseSession?.data?.result?.presentation, [isFetchingSession]);
    const host = useMemo(() => responseSession?.data?.result?.host, [isFetchingSession]);
    const totalMessage = useMemo(() => responseSession?.data?.result?.totalMessage || 0, [isFetchingSession]);
    const isFetching = useMemo(() => isFetchingSession, [isFetchingSession]);

    useEffect(() => {
        if (_.isEmpty(session) || breadcrumbRef.current == null) return;
        const defaultBreadcrumbs = _.cloneDeep(breadcrumbRef.current?.getBreadcrumbs() || []);
        defaultBreadcrumbs?.pop();

        const createdRemoveUtc = DateTimeUtil.convertDateFromUtcDate(session.createdAt);
        const createdAtFormatted = DateTimeUtil.formatDateTime(createdRemoveUtc, DateTimeUtil.VN_DATE_TIME_FORMAT);

        defaultBreadcrumbs.push({
            title: `${session.name} (${createdAtFormatted})`,
        });

        breadcrumbRef.current?.setBreadcrumbs(defaultBreadcrumbs);
    }, [isFetching]);

    const handleChange = (_event: React.SyntheticEvent, newValue: SESSION_DETAIL_TAB) => {
        setTab(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `session-detail-tab-${index}`,
            'aria-controls': `session-detail-tabpanel-${index}`,
        };
    }

    if (isFetching || !presentation || !session || !host) return <Loading />;
    return (
        <AppContainer breadcrumbRef={breadcrumbRef}>
            <div className="w-full h-full flex flex-col">
                {/* <div className="w-2/4 flex h-10 items-center flex-row justify-between mt-5 mb-7">
                    <div className="flex-col flex w-full gap-2">
                        <div>Phiên: {session?.name}</div>
                        <div>Mã: {session?.code}</div>
                    </div>
                    <div className="flex-col flex w-full gap-2">
                        <div>Người trình bày: {host?.fullname}</div>
                        <div>
                            Ngày trình bày:{' '}
                            {DateTimeUtil.formatDateTime(
                                session?.createdAt || new Date(),
                                DateTimeUtil.VN_DATE_TIME_FORMAT,
                            )}
                        </div>
                    </div>
                </div> */}
                <Tabs value={tab} onChange={handleChange} className="mb-[15px]">
                    <Tab
                        label={`Người tham gia (${participantGridController.paginatedList.totalCount})`}
                        {...a11yProps(0)}
                    />
                    <Tab label={`Slides (${presentation.slides?.length || 0})`} {...a11yProps(1)} />
                    <Tab label={`Tin nhắn (${totalMessage})`} {...a11yProps(2)} />
                    <Tab label={`Câu hỏi (${questionGridController.paginatedList.totalCount})`} {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={SESSION_DETAIL_TAB.PARTICIPANT} index={tab} className="w-full flex-1">
                    <ParticipantGrid gridController={participantGridController} ref={participantGridRef} />
                </TabPanel>
                <TabPanel value={SESSION_DETAIL_TAB.QUESTION} index={tab} className="w-full flex-1">
                    <QuestionGrid gridController={questionGridController} ref={questionGridRef} />
                </TabPanel>
                <TabPanel value={SESSION_DETAIL_TAB.SLIDE} index={tab} className="w-full flex-1">
                    <PresentationViewer presentation={presentation} />
                </TabPanel>
                <TabPanel value={SESSION_DETAIL_TAB.MESSAGE} index={tab} className="w-full flex-1">
                    <MessageList sessionID={session.sessionID} isVisible={SESSION_DETAIL_TAB.MESSAGE === tab} />
                </TabPanel>
            </div>
        </AppContainer>
    );
};

export default SessionDetailPage;
