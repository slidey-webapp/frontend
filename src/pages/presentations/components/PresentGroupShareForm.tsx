import React, { useRef } from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseForm, { BaseFormRef } from '~/components/forms/BaseForm';
import Loading from '~/components/loadings/Loading';
import { useGroupCombo } from '~/pages/groups/api/useGroupCombo';
import { Id } from '~/types/shared';

interface Props {
    onClose: () => void;
    onSubmit: (groupID: Id) => void;
}

const PresentGroupShareForm: React.FC<Props> = ({ onClose, onSubmit }) => {
    const { data: responseGroupCombo, isLoading } = useGroupCombo();
    const formRef = useRef<BaseFormRef>(null);

    const handleSubmit = async ({ groupID }: { groupID: Id }) => {
        onSubmit(groupID);
        onClose();
    };

    if (isLoading) return <Loading />;
    return (
        <BaseForm
            ref={formRef}
            onSubmit={handleSubmit}
            fields={[
                {
                    name: 'groupID',
                    classNameCol: 'col-span-12',
                    label: 'Nhóm',
                    type: 'select',
                    required: true,
                    options: responseGroupCombo?.data.result || [],
                },
            ]}
            buttons={{
                closeButton: (
                    <ButtonBase title="Đóng" startIcon="close" color="secondary" onClick={onClose} className="!mx-1" />
                ),
                submitButton: <ButtonBase type="submit" title="Lưu" startIcon="save" className="!mx-1" />,
            }}
        />
    );
};

export default PresentGroupShareForm;
