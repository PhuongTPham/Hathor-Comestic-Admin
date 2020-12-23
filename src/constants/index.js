const COMMON_CONST = {
  MESSAGE_UPDATE_SUCCEED: 'Sửa thành công',
  MESSAGE_UPDATE_FAILED: 'Sửa thất bại',
  MESSAGE_ADD_SUCCEED: 'Tạo mới thành công',
  MESSAGE_ADD_FAILED: 'Tạo mới thất bại',
  MESSAGE_DELETE_SUCCEED: 'Xóa thành công',
  MESSAGE_DELETE_FAILED: 'Xóa mới thất bại',
  MESSAGE_DELETE_MY_ACCOUNT: 'Không thể xóa tài khoản của chính mình',
  MESSAGE_CHANGE_PASSWORD_SUCCEED: 'Mật khẩu đã được thay đổi',
  MESSAGE_CHANGE_PASSWORD_FAILED: 'Không thể thay đổi mật khẩu. Xin hãy xác nhận lại!',
  CHART_OPTIONS: {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Số người subscribeth',
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y}%',
        },
      },
    },
    tooltip: {
      headerFormat: "<span style='font-size:11px'>{series.name}</span><br>",
      pointFormat: "<span style='color:{point.color}'>{point.name}</span>: <b>{point.y}%</b><br/>",
    },
    series: [
      {
        name: 'Browsers',
        colorByPoint: true,
        data: [
          {
            name: 'Số người đã subscriber',
            y: 62,
          },
          {
            name: 'Số người mới subscriber',
            y: 12,
          },
          {
            name: 'Số người chưa subscriber',
            y: 26,
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  },
};

const ACCOUNT_CONST = {
  HEADER_MANAGE_ACCOUNT_ADMIN: 'QUẢN LÝ TÀI KHOẢN',
  TITLE_MANAGE_ACCOUNT: 'Thêm tài khoản',
  ID_POPUP_ADD_ACCOUNT: 'modal-add-account',
  ID_POPUP_DETAIL_ACCOUNT: 'modal-detail-account',
  ID_POPUP_DELETE_ACCOUNT: 'modal-delete-account',
  CONTENT_POPUP_DELETE_ACCOUNT: 'Bạn có chắc chắn muốn xóa tài khoản này ?',
  TITLE_POPUP_ADD_ACCOUNT: 'Thêm tài khoản',
  TITLE_POPUP_DETAIL_ACCOUNT: 'Chi tiết tài khoản',
  TITLE_POPUP_DELETE_ACCOUNT: 'Xóa tài khoản',
  REGEX_PASSWORD: '^(?=.*[a-z])(?=.*[A-Z])(?=.*)[A-Za-z!@#$%^&*?]{8,50}$',
};

const CATEGORY_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ DANH MỤC SẢN PHẨM',
  TITLE_MANAGE: 'Thêm danh mục sản phẩm',
  ID_POPUP_ADD: 'modal-add-category',
  ID_POPUP_DETAIL: 'modal-detail-category',
  ID_POPUP_DELETE: 'modal-delete-category',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa danh mục sản phẩm này ?',
  TITLE_POPUP_ADD: 'Thêm danh mục sản phẩm',
  TITLE_POPUP_DELETE: 'Xóa danh mục sản phẩm',
};

const COMMENT_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ BÌNH LUẬN',
  TITLE_MANAGE: 'Thêm tòa nhà',
  ID_POPUP_ADD: 'modal-add-toanha',
  ID_POPUP_DETAIL: 'modal-detail-toanha',
  ID_POPUP_DELETE: 'modal-delete-toanha',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa tòa nhà này ?',
  TITLE_POPUP_ADD: 'Thêm tòa nhà',
  TITLE_POPUP_DELETE: 'Xóa tòa nhà',
};

const SUPPLIER_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ NHÀ CUNG CẤP SẢN PHẨM',
  TITLE_MANAGE: 'Thêm nhà cung cấp',
  ID_POPUP_ADD: 'modal-add-supplier',
  ID_POPUP_DETAIL: 'modal-detail-supplier',
  ID_POPUP_DELETE: 'modal-delete-supplier',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa nhà cung ứng này ?',
  TITLE_POPUP_ADD: 'Thêm nhà cung cấp',
  TITLE_POPUP_DELETE: 'Xóa nhà cung cấp',
};

const CONTACT_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ LIÊN HỆ',
  TITLE_MANAGE: 'Thêm liên hệ',
  ID_POPUP_ADD: 'modal-add-contact',
  ID_POPUP_DETAIL: 'modal-detail-contact',
  ID_POPUP_DELETE: 'modal-delete-contact',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa liên hệ này ?',
  TITLE_POPUP_ADD: 'Thêm liên hệ',
  TITLE_POPUP_DELETE: 'Xóa liên hệ',
};

const PRODUCT_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ SẢM PHẨM',
  TITLE_MANAGE: 'Thêm sản phẩm',
  ID_POPUP_ADD: 'modal-add-product',
  ID_POPUP_DETAIL: 'modal-detail-product',
  ID_POPUP_DELETE: 'modal-delete-product',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa sản phẩm này ?',
  TITLE_POPUP_ADD: 'Thêm sản phẩm',
  TITLE_POPUP_DELETE: 'Xóa sản phẩm',
};
const SUBSCRIBER_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ NGƯỜI THEO DÕI',
  ID_POPUP_DETAIL: 'modal-detail-subscriber',
  ID_POPUP_DELETE: 'modal-delete-subscriber',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa subscriber này ?',
  TITLE_POPUP_DELETE: 'Xóa subscriber',
};
const BLOG_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ BLOG',
  TITLE_MANAGE: 'Thêm review',
  ID_POPUP_ADD: 'modal-add-blog',
  ID_POPUP_DETAIL: 'modal-detail-blog',
  ID_POPUP_DELETE: 'modal-delete-blog',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa blog này ?',
  TITLE_POPUP_ADD: 'Thêm blog',
  TITLE_POPUP_DELETE: 'Xóa blog',
};

export default {
  COMMON_CONST,
  ACCOUNT_CONST,
  CATEGORY_CONST,
  COMMENT_CONST,
  SUPPLIER_CONST,
  CONTACT_CONST,
  PRODUCT_CONST,
  SUBSCRIBER_CONST,
  BLOG_CONST,
};
