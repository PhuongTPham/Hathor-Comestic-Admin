/* eslint-disable camelcase */
/* eslint-disable radix */

const api = (config) => ({
  loginApi: ({ email, password }) => config('post', '/auth/v1/login/', {
    email,
    password,
  }),
  getProfile: (tokenUser) => config('get', '/account/v1/', '', {
    Authorization: `JWT ${tokenUser} `,
  }),
  logout: (token) => config('post', '/auth/v1/logout/', '', {
    Authorization: `JWT ${token} `,
  }),
  changePassword: (payload) => config('patch', '/auth/v1/change-password/', payload),
  // account
  getAccount: (keyword) => config('get', `/cms-admin/v1/list-account/?search=${keyword}`),
  addAccount: (payload) => config('post', '/auth/v1/register/', payload),
  changeRoleAccount: (payload) => config('post', `/cms-admin/v1/change-role-account/?user_id=${payload.user_id}`, payload),
  updateAccount: (payload) => config('patch', `/account/v1/update-profile/${payload.id}/`, payload.data),

  // getService: (keyword) => config('get', `/dich-vu/v1/list-dich-vu/?search=${keyword}`, ''),

  // category
  getListCategory: (keyword) => config('get', `/cms-admin/v1/list-category/?search=${keyword}`),
  getListCategoryById: (payload) => config('get', `/cms-admin/v1/list-item-by-category_id/${payload.id}`),
  createCategory: (payload) => config('post', '/cms-admin/v1/add-new-category/', payload),
  updateCategory: (payload) => config('post', '/cms-admin/v1/update-category/', payload.data),
  deleteCategory: (payload) => config('post', '/cms-admin/v1/delete-category/', payload),

  // product
  createProduct: (payload) => config('post', '/cms-admin/v1/add-new-item/', payload),
  deleteProduct: (payload) => config('post', '/cms-admin/v1/delete-item/', payload),
  getDetailProduct: (payload) => config('get', `/cms-admin/v1/get-detail-item/${payload.id}`),
  getListProduct: (keyword) => config('get', `/cms-admin/v1/list-item/?search=${keyword}`),
  updateProduct: (payload) => config('post', '/cms-admin/v1/update-item/', payload.data),

  // order
  getListOrder: (keyword) => config('get', `/cms-admin/v1/list-order/?search=${keyword}`),
  updateStatusOrder: (payload) => config('post', '/cms-admin/v1/update-order/', payload),

  // image
  uploadImage: (payload) => config('post', '/cms-admin/v1/upload-image-item/', payload),

  // supplier
  getListSupplier: (keyword) => config('get', `/cms-admin/v1/list-supplier/?search=${keyword}`),
  addSupplier: (payload) => config('post', '/cms-admin/v1/add-new-supplier/', payload),
  updateSupplier: (payload) => config('post', '/cms-admin/v1/update-supplier/', payload.data),
  deleteSupplier: (payload) => config('post', '/cms-admin/v1/delete-supplier/', payload),

  // contact
  getListContact: (keyword) => config('get', `/customer/v1/list-contact/?search=${keyword}`),
  deleteContact: (payload) => config('post', '/customer/v1/delete-contact/', payload),

  // comment
  getListComment: (keyword) => config('get', `/cms-admin/v1/list-comment/?search=${keyword}`),
  deleteComment: (payload) => config('post', '/cms-admin/v1/delete-comment/', payload),

  // subscriber
  getListSubscriber: (keyword) => config('get', `/customer/v1/list-subscriber/?search=${keyword}`),
  deleteSubscriber: (payload) => config('post', '/customer/v1/delete-subscriber/', payload),

  // blog
  getListBlog: (keyword) => config('get', `/customer/v1/list-blog/?search=${keyword}`),
  addBlog: (payload) => config('post', '/customer/v1/add_new_blog/', payload),
  updateBlog: (payload) => config('post', '/customer/v1/update_blog/', payload.data),
  deleteBlog: (payload) => config('post', '/customer/v1/delete-blog/', payload),

  // statistic
  getAllStatistic: () => config('get', '/cms-admin/v1/statistic/'),

});

export default api;
