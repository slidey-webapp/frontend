import React, { useRef } from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseForm, { BaseFormRef } from '~/components/forms/BaseForm';
import { requestApi } from '~/libs/axios';
import NotifyUtil from '~/utils/NotifyUtil';
import { usePresentationJoinSessionContext } from '../../PresentationJoinSession';
import { SESSION_MESSAGE_SEND_API } from '../../api/presentation.api';

interface Props {
    onClose: () => void;
}

const ParticipantSendMessage: React.FC<Props> = ({ onClose }) => {
    const { sessionID, participantID } = usePresentationJoinSessionContext();

    const formRef = useRef<BaseFormRef>(null);

    const handleSubmit = async ({ content }: { content: string }) => {
        const response = await requestApi('post', SESSION_MESSAGE_SEND_API, {
            sessionID,
            participantID,
            content,
        });

        if (response.status === 200) {
            onClose();
            return;
        }

        response.data.message && NotifyUtil.error(response.data.message);
    };

    return (
        <div className="w-full h-full p-6 pt-2">
            <BaseForm
                ref={formRef}
                onSubmit={handleSubmit}
                fields={[
                    {
                        name: 'content',
                        classNameCol: 'col-span-12',
                        label: 'Nội dung tin nhắn',
                        type: 'text',
                        required: true,
                    },
                ]}
                buttons={{
                    submitButton: <ButtonBase type="submit" title="Gửi" startIcon="send" className="!mx-1" />,
                }}
            />
        </div>
    );
};

export default ParticipantSendMessage;
