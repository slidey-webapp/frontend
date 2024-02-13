import { Box, Typography } from '@mui/material';
import React from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className?: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, className, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`session-detail-tabpanel-${index}`}
            aria-labelledby={`session-detail-tab-${index}`}
            className={className}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

export default TabPanel;
