import { Avatar, Tooltip, TooltipProps } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { indigo } from '~/themes/colors';

export default class ComponentUtil {
    static renderAvatarUser = (config: {
        fullName: string;
        key?: React.Key;
        avatarUrl?: string;
        variant?: 'circular' | 'rounded' | 'square';
        size?: number;
        className?: string;
        style?: React.CSSProperties;
        tooltip?: boolean | string;
        active?: boolean;
    }) => {
        const { key, avatarUrl, fullName, size, variant, className, style, tooltip = false, active = false } = config;

        const activeStyle: React.CSSProperties = active
            ? {
                  border: `3px solid ${_.get(indigo, 'main')}`,
              }
            : {};

        if (avatarUrl) {
            return this.tooltipComponent(
                <Avatar
                    key={key}
                    sx={{
                        width: size,
                        height: size,
                    }}
                    variant={variant}
                    src={avatarUrl}
                    style={activeStyle}
                />,
                tooltip,
                fullName,
            );
        }

        const index = this.generateRandom(fullName);
        const background = this.ARRAY_COLOR_CONSTANT[index];

        const matches = _.words(fullName);
        const firstWord = matches[0].substring(0, 1).toUpperCase();
        if (_.size(matches) === 1) {
            return this.tooltipComponent(
                <Avatar
                    key={key}
                    variant={variant}
                    style={{ background: background, ...style, ...activeStyle }}
                    sx={{
                        width: size,
                        height: size,
                    }}
                    className={className}
                >
                    {firstWord}
                </Avatar>,
                tooltip,
                fullName,
            );
        }
        const lastWord = _.last(matches)?.substring(0, 1).toUpperCase();
        return this.tooltipComponent(
            <Avatar
                key={key}
                style={{ background: background, ...style, ...activeStyle }}
                variant={variant}
                sx={{
                    width: size,
                    height: size,
                }}
                className={className}
            >
                {firstWord + lastWord}
            </Avatar>,
            tooltip,
            fullName,
        );
    };

    static tooltipComponent = (children: TooltipProps['children'], tooltip?: boolean | string, title?: string) => {
        if (!tooltip) return children;
        if (typeof tooltip === 'boolean')
            return (
                <Tooltip title={title} placement="top">
                    {children}
                </Tooltip>
            );

        return (
            <Tooltip title={tooltip} placement="top">
                {children}
            </Tooltip>
        );
    };

    static hashCode = (input: string) => {
        return [...input].reduce((hash, chr) => {
            return hash * 33 + chr.charCodeAt(0);
        }, 0);
    };

    static generateRandom = (stringParam: string) => {
        return this.hashCode(stringParam) % this.ARRAY_COLOR_CONSTANT.length;
    };

    static ARRAY_COLOR_CONSTANT = [
        '#dbae58',
        '#3c6478',
        '#43abc9',
        '#7e909a',
        '#d3b53d',
        '#f26d21',
        '#c02f1d',
        '#FFB6C1',
        '#1c4e80',
        '#0091D5',
        '#488a99',
        '#FFB6C1',
        '#ac3e31',
        '#6ab187',
        '#b081e7',
        '#dbae58',
        '#3c6478',
        '#43abc9',
        '#7e909a',
        '#d3b53d',
        '#f26d21',
        '#c02f1d',
        '#a3b86c',
        '#1c4e80',
        '#0091D5',
        '#488a99',
        '#0091d5',
        '#ac3e31',
        '#FFB6C1',
        '#b081e7',
        '#dbae58',
        '#3c6478',
        '#43abc9',
        '#7e909a',
        '#d3b53d',
        '#f26d21',
        '#c02f1d',
        '#a3b86c',
        '#1c4e80',
        '#0091D5',
        '#488a99',
        '#FFB6C1',
        '#ac3e31',
        '#6ab187',
        '#b081e7',
    ];
}
