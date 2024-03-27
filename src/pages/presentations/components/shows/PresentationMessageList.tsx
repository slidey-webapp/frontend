import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import DateTimeUtil from '~/utils/DateTimeUtil';
import { usePresentationShowContext } from '../../PresentationHostShow';
import Empty from '~/components/layouts/Empty';

interface Props {}

const PresentationMessageList: React.FC<Props> = () => {
    const { messages } = usePresentationShowContext();

    const renderBody = () => {
        if (!messages || messages.length === 0) {
            return <Empty className='my-6' />;
        }

        return messages.map((message, index) => {
            return (
                <div
                    key={message.messageID}
                    className={clsx({
                        'mb-4': index < messages.length - 1,
                    })}
                >
                    <div
                        className="py-2 px-4 mb-2"
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
                            borderRadius: 20,
                        }}
                    >
                        <div className="mb-2 text-black font-semibold">{message.sender?.name}</div>
                        <div className="">{message.content}</div>
                    </div>
                    <div className="px-4 text-neutral-500 text-xs">
                        {moment.utc(message.createdAt, DateTimeUtil.DATE_TIME_FORMAT).fromNow()}
                    </div>
                </div>
            );
        });
    };

    return <div className="">{renderBody()}</div>;
};

export default PresentationMessageList;
