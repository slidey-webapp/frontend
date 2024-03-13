import { FormControl, TextField, Tooltip } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import BaseIcon from '~/components/icons/BaseIcon';
import { useTemplateCreateContext } from '../TemplateCreatePage';

interface Props {}

const TemplateCreateHeader: React.FC<Props> = () => {
    const { presentation, onUpdatePresentation, backStep, onCreateTemplate } = useTemplateCreateContext();

    const navigate = useNavigate();

    return (
        <div
            className="w-full flex items-center px-4 border-b border-[#e8e8eb]"
            style={{
                minHeight: 56,
                maxHeight: 56,
                height: 56,
            }}
        >
            <div className="w-full h-full flex items-center justify-between">
                <div className="flex-1 flex items-center ">
                    <Tooltip title="Trở lại">
                        <div
                            className="cursor-pointer transition-all duration-300 ease-in-out hover:text-neutral-500"
                            onClick={() => navigate(-backStep)}
                        >
                            <BaseIcon type={'arrow-back'} />
                        </div>
                    </Tooltip>
                    <div className="w-56 ml-4" title={presentation.name}>
                        <FormControl fullWidth>
                            <TextField
                                variant="standard"
                                size="small"
                                placeholder="Tên bài trình chiếu..."
                                defaultValue={presentation.name}
                                onChange={_.debounce(
                                    event =>
                                        onUpdatePresentation({
                                            name: event.target.value,
                                        }),
                                    200,
                                )}
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-end">
                    <ButtonBase title={'Lưu mẫu'} startIcon={'save'} className="!m-0" onClick={onCreateTemplate} />
                </div>
            </div>
        </div>
    );
};

export default TemplateCreateHeader;
