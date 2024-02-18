import { useState, useEffect } from 'react';

const SCROLL_OFFSET = 15;
const THRESHOLD = 100;

const useInfiniteScroll = (callback: () => any, direction: 'top' | 'bottom') => {
    const [isFetching, setIsFetching] = useState(false);
    const [element, setElement] = useState<HTMLElement | null>(null);
    const handleScroll = () => {
        if (!element) {
            return;
        }
        if (element.clientHeight < THRESHOLD) {
            return;
        }
        if (direction === 'top') {
            if (element.scrollTop <= SCROLL_OFFSET) {
                setIsFetching(true);
            }
        } else {
            if (element.scrollHeight - element.clientHeight - element.scrollTop <= SCROLL_OFFSET) {
                setIsFetching(true);
            }
        }
    };

    useEffect(() => {
        if (element) {
            element.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
        };
    }, [element]);

    useEffect(() => {
        if (isFetching && callback) {
            callback();
        }
    }, [isFetching]);

    return { isFetching, setIsFetching, element, setElement };
};

export default useInfiniteScroll;
