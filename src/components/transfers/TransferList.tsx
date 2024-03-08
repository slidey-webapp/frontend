import { FormControl, TextField } from '@mui/material';
import clsx from 'clsx';
import * as React from 'react';
import { useState } from 'react';
import { ComboOption, Id } from '~/types/shared';
import { ButtonBase } from '../buttons/ButtonBase';

interface Props {
    options: ComboOption[];
    value?: Id[];
}

export interface TransferRef {
    getValue: () => ComboOption[];
}

const TransferList = React.forwardRef<TransferRef, Props>(({ options, value = [] }, ref) => {
    const [rightList, setRightList] = useState<ComboOption[]>(options.filter(x => value.includes(x.value)));
    const [leftList, setLeftList] = useState<ComboOption[]>(options.filter(x => !value.includes(x.value)));
    const [checkedList, setCheckedList] = useState<ComboOption[]>([]);

    const leftChecked = checkedList.filter(x => leftList.some(y => y.value === x.value));
    const rightChecked = checkedList.filter(x => rightList.some(y => y.value === x.value));

    const renderPaper = (list: ComboOption[]) => {
        return (
            <div className="flex-1 flex flex-col gap-y-4">
                <div className="w-full">
                    <FormControl fullWidth>
                        <TextField size="small" placeholder="Tìm kiếm..." variant="outlined" />
                    </FormControl>
                </div>
                <div
                    className="flex-1 overflow-x-hidden overflow-y-auto rounded border border-neutral-200"
                    style={{
                        maxHeight: 506,
                        minHeight: 182,
                    }}
                >
                    {list.map(x => {
                        const isChecked = checkedList.some(val => val.value === x.value);

                        return (
                            <div
                                key={x.value}
                                className={clsx(
                                    'line-clamp-1 w-full h-9 flex items-center px-3 cursor-default text-sm',
                                    'transition-all duration-200 ease-in-out hover:bg-indigo-dark hover:text-white',
                                    {
                                        'bg-indigo-main text-white': isChecked,
                                    },
                                )}
                                onClick={() => {
                                    if (isChecked) {
                                        setCheckedList(pre => pre.filter(y => y.value !== x.value));
                                    } else {
                                        setCheckedList(pre => [...pre, x]);
                                    }
                                }}
                                onDoubleClick={() => handleDoubleClick(x)}
                            >
                                {x.label}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const handleAllRight = () => {
        setRightList(rightList.concat(leftList));
        setLeftList([]);
    };

    const handleCheckedRight = () => {
        setRightList(pre => [...pre, ...leftChecked]);
        setLeftList(pre => pre.filter(x => leftChecked.every(y => y.value !== x.value)));
        setCheckedList(pre => pre.filter(x => leftChecked.every(y => y.value !== x.value)));
    };

    const handleCheckedLeft = () => {
        setLeftList(leftList.concat(rightChecked));
        setRightList(pre => pre.filter(x => rightChecked.every(y => y.value !== x.value)));
        setCheckedList(pre => pre.filter(x => rightChecked.every(y => y.value !== x.value)));
    };

    const handleDoubleClick = (opt: ComboOption) => {
        const isLeft = leftList.some(x => x.value === opt.value);

        if (isLeft) {
            // move to right
            setRightList(pre => [...pre, opt]);
            setLeftList(pre => pre.filter(x => x.value !== opt.value));
        } else {
            // move to left
            setLeftList(pre => [...pre, opt]);
            setRightList(pre => pre.filter(x => x.value !== opt.value));
        }

        setCheckedList(pre => pre.filter(x => x.value !== opt.value));
    };

    const handleAllLeft = () => {
        setLeftList(leftList.concat(rightList));
        setRightList([]);
    };

    React.useImperativeHandle(ref, () => ({
        getValue: () => {
            console.log(checkedList);
            console.log(rightChecked);
            console.log(leftChecked);
            console.log(leftList);
            console.log(rightList);

            return rightList;
        },
    }));

    return (
        <div className="w-full h-full flex gap-x-4 select-none">
            {renderPaper(leftList)}
            <div className="flex flex-col gap-y-4">
                <div
                    style={{
                        height: 38,
                    }}
                />
                <div className="flex flex-1 flex-col justify-center items-center gap-y-2">
                    <ButtonBase title="≫" color="secondary" disabled={leftList.length === 0} onClick={handleAllRight} />
                    <ButtonBase
                        title="&gt;"
                        color="secondary"
                        disabled={leftChecked.length === 0}
                        onClick={handleCheckedRight}
                    />
                    <ButtonBase
                        title="&lt;"
                        color="secondary"
                        disabled={rightChecked.length === 0}
                        onClick={handleCheckedLeft}
                    />
                    <ButtonBase title="≪" color="secondary" disabled={rightList.length === 0} onClick={handleAllLeft} />
                </div>
            </div>
            {renderPaper(rightList)}
        </div>
    );
});

export default TransferList;
