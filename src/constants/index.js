const COMMON_CONST = {
  MESSAGE_UPDATE_SUCCEED: 'Sửa thành công',
  MESSAGE_UPDATE_FAILED: 'Sửa thất bại',
  MESSAGE_ADD_SUCCEED: 'Tạo mới thành công',
  MESSAGE_ADD_FAILED: 'Tạo mới thất bại',
  MESSAGE_DELETE_SUCCEED: 'Xóa thành công',
  MESSAGE_DELETE_FAILED: 'Xóa mới thất bại',
  MESSAGE_DELETE_MY_ACCOUNT: 'Không thể xóa tài khoản của chính mình',
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

const CHUNHA_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ CHỦ NHÀ',
  TITLE_MANAGE: 'Thêm chủ nhà',
  ID_POPUP_ADD: 'modal-add-chunha',
  ID_POPUP_DETAIL: 'modal-detail-chunha',
  ID_POPUP_DELETE: 'modal-delete-chunha',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa chủ nhà này ?',
  TITLE_POPUP_ADD: 'Thêm chủ nha',
  TITLE_POPUP_DELETE: 'Xóa chủ nhà',
};

export default {
  COMMON_CONST,
  ACCOUNT_CONST,
  CATEGORY_CONST,
  COMMENT_CONST,
  SUPPLIER_CONST,
  CHUNHA_CONST,
};
