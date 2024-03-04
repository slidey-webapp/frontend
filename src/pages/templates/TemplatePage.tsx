import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import { AppContainer } from '~/components/layouts/AppContainer';
import TemplateList from './components/TemplateList';

interface Props {}

const TemplatePage: React.FC<Props> = () => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate('/template/create');
    };

    return (
        <AppContainer className="flex flex-col overflow-hidden">
            <div className="flex items-center justify-end gap-x-2.5 w-full h-fit min-h-[40px] mb-7">
                <ButtonBase onClick={handleCreate} color={'success'} title="Tạo mới" startIcon={'add'} />
            </div>
            <div className="base-grid p-7 flex-1 relative overflow-x-hidden overflow-y-auto">
                <TemplateList />
            </div>
        </AppContainer>
    );
};

export default TemplatePage;
