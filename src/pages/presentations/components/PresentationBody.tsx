import clsx from 'clsx';
import React from 'react';
import BaseIcon from '~/components/icons/BaseIcon';
import PresentationBodyEditor from './PresentationBodyEditor';
import PresentationBodyPreview from './PresentationBodyPreview';

interface Props {}

const PresentationBody: React.FC<Props> = props => {
    return (
        <div className="flex-1 h-full bg-neutral-100 flex">
            <PresentationBodyPreview />
            <PresentationBodyEditor />
        </div>
    );
};

export default PresentationBody;
