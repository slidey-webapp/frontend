import React from 'react';
import { BaseFormModalProps } from '~/types/shared';

interface Props extends BaseFormModalProps {
    groupID?: number;
}

const GroupForm: React.FC<Props> = ({
    groupID,
    modalType,
    onClose,
    onSuccess
}) => {
    return <>GroupForm</>;
};

export default GroupForm;
