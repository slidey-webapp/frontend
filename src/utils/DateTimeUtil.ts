import moment from 'moment';

export default class DateTimeUtil {
    static VN_DATE_FORMAT = 'DD/MM/YYYY';
    static VN_DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';
    static DATE_FORMAT = 'YYYY-MM-DD';
    static DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

    static formatDateTime = (date: Date | string, format: string = DateTimeUtil.VN_DATE_FORMAT): string => {
        return moment(date, DateTimeUtil.DATE_TIME_FORMAT).format(format);
    };
}
