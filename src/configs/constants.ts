import { GroupMemberRole } from '~/pages/groups/types/group';
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
}
