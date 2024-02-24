import { GroupMemberRole } from '~/pages/groups/types/group';
import { SlideType } from '~/pages/presentations/types/slide';
import { ComboOption } from '~/types/shared';

//action row
export const CREATE_BUTTON_TOOLTIP = 'Tạo mới';
export const EDIT_BUTTON_TOOLTIP = 'Sửa';
export const DELETE_BUTTON_TOOLTIP = 'Xóa';
export const VIEW_BUTTON_TOOLTIP = 'Xem';
export const DETAIL_BUTTON_TOOLTIP = 'Chi tiết';
export const EMPTY_DESCRIPTION = 'Không có dữ liệu';

//notify
export class NotificationConstant {
    static TITLE = 'Thông báo';
    static DESCRIPTION_DELETE_FAIL = 'Xóa không thành công!';
    static DESCRIPTION_DELETE_SUCCESS = 'Xóa thành công';
    static DESCRIPTION_UPDATE_FAIL = 'Cập nhật không thành công!';
    static DESCRIPTION_UPDATE_SUCCESS = 'Cập nhật thành công';
    static DESCRIPTION_CREATE_FAIL = 'Tạo mới không thành công!';
    static DESCRIPTION_CREATE_SUCCESS = 'Tạo mới thành công';
    static CONFIRM_DELETE = 'Bạn có chắc muốn xóa?';
    static SERVER_ERROR = 'Lỗi hệ thống, Vui lòng liên hệ quản trị viên!';
    static DESCRIPTION_SAVE = 'Bạn có chắc muốn lưu lại không?';
    static SEND_MAIL_SUCCESS = 'Gửi mail thành công!';
    static SEND_MAIL_FAIL = 'Gửi mail thất bại!';
    static ERROR_MESSAGE_UTIL = 'Dữ liệu không hợp lệ';
    static COMMON_MESSAGE = 'Có lỗi xảy ra!';

    static NOT_EMPTY = 'Không được để trống!';
}

export class DashboardLayoutConstant {
    static SIDE_NAV_WIDTH = 280;
    static TOP_NAV_HEIGHT = 64;
}

export class ComboOptionConstant {
    static ROLE: ComboOption<GroupMemberRole>[] = [
        {
            value: 'COOWNER',
            label: 'Đồng sở hữu',
        },
        {
            value: 'MEMBER',
            label: 'Thành viên',
        },
    ];

    static SLIDE_TYPE: ComboOption<SlideType>[] = [
        {
            value: 'HEADING',
            label: 'Heading',
        },
        {
            value: 'PARAGRAPH',
            label: 'Paragraph',
        },
        {
            value: 'MULTIPLE_CHOICE',
            label: 'Multiple choice',
        },
    ];
}

export class PreviewFontSizeConstant {
    static HEADING_EXTRA_SMALL = '1.8cqw';
    static HEADING_SMALL = '2cqw';
    static HEADING_MEDIUM = '2.2cqw';
    static HEADING_LARGE = '2.4cqw';
    static HEADING_EXTRA_LARGE = '2.6cqw';

    static SECONDARY_EXTRA_SMALL = '0.75cqw';
    static SECONDARY_SMALL = '1cqw';
    static SECONDARY_MEDIUM = '1.25cqw';
    static SECONDARY_LARGE = '1.5cqw';
    static SECONDARY_EXTRA_LARGE = '2cqw';
}

export class ShowFontSizeConstant {
    static HEADING_EXTRA_SMALL = '48px';
    static HEADING_SMALL = '60px';
    static HEADING_MEDIUM = '72px';
    static HEADING_LARGE = '96px';
    static HEADING_EXTRA_LARGE = '128px';

    static SECONDARY_EXTRA_SMALL = '16px';
    static SECONDARY_SMALL = '20px';
    static SECONDARY_MEDIUM = '24px';
    static SECONDARY_LARGE = '30px';
    static SECONDARY_EXTRA_LARGE = '36px';

    static HEADING = '72px';
}

export class PreviewSizeConstant {
    static WIDTH = 1920;
    static HEIGHT = 1080;
}

export const COLORS = ['#2a64b0', '#eb3630', '#f78b1f', '#3eb14a', '#a11600'];

export class SocketEvent {
    static CONNECTION = 'connection';
    static AUTHENTICATION = 'authentication';
    static JOIN_SESSION = 'join_session';
    static MESSAGE = 'message';
    static QUESTION = 'question';
    static UPVOTE_QUESTION = 'upvote_question';
    static ANSWER_QUESTION = 'answer_question';
    static SUBMIT_SLIDE_RESULT = 'submit_slide_result';
    static CHANGE_SLIDE = 'change_slide';
    static END_SESSION = 'end_session';
    static START_PRESENTING = 'start_presenting';
    static HOST_JOIN_SESSION = 'host_join_session';
    static JOIN_EDIT_PRESENTATION = 'join_edit_presentation';
    static UPDATE_PRESENTATION = 'update_presentation';
    static PING_EDIT_PRESENTATION = 'ping_edit_presentation';
    static LEAVE_EDIT_PRESENTATION = 'leave_edit_presentation';
}
