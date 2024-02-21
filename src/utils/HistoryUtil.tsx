import _ from 'lodash';
import qs from 'qs';
import { NavigateFunction } from 'react-router-dom';

export default class HistoryUtil {
    static pushSearchParams = (navigate: NavigateFunction, params: Record<string, any>) => {
        const { pathname, search } = location;
        const searchRemoveQuestionMark = search.substring(1);

        const newSearch = Object.assign(qs.parse(searchRemoveQuestionMark), params);

        navigate({ pathname: pathname, search: qs.stringify(newSearch) });
    };

    static getSearchParams = () => {
        const { search } = location;
        const searchRemoveQuestionMark = search.substring(1);

        return qs.parse(searchRemoveQuestionMark);
    };

    static getSearchParam = (field: string) => {
        const searchParams = this.getSearchParams();

        return _.get(searchParams, field);
    };

    static clearSearchParams = (navigate: NavigateFunction, keysKeep: string[] = []) => {
        const { pathname } = location;
        const searchParams = this.getSearchParams();

        Object.keys(searchParams).forEach(key => {
            if (keysKeep.includes(key)) return;

            delete searchParams[key];
        });

        navigate({ pathname: pathname, search: qs.stringify(searchParams) });
    };

    static clearSearchParamWithKeys = (navigate: NavigateFunction, keysRemove: string[] = []) => {
        const { pathname } = location;
        const searchParams = this.getSearchParams();

        Object.keys(searchParams).forEach(key => {
            if (keysRemove.includes(key)) delete searchParams[key];
        });

        navigate({ pathname: pathname, search: qs.stringify(searchParams) });
    };
}
