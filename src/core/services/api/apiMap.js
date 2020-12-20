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
  // account
  getAccount: (keyword) => config('get', `/cms-admin/v1/list-account/?search=${keyword}`),
  addAccount: (payload) => config('post', '/auth/v1/register/', payload),
  changeRoleAccount: (payload) => config('post', '//cms-admin/v1/change-role-account/', payload),
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
  updateProduct: (payload) => config('post', '/cms-admin/v1/update-category/', payload.data),

  // order
  getDetailOrder: (payload) => config('get', `/cms-admin/v1/get-order-detail/${payload.id}`),
  getListOrder: (keyword) => config('get', `/cms-admin/v1/list-order/?search=${keyword}`),

  // image
  uploadImage: (payload) => config('post', `/cms-admin/v1/upload-image-item/${payload.data}`),

  // supplier
  getListSupplier: (keyword) => config('get', `/cms-admin/v1/list-supplier/?search=${keyword}`),
  addSupplier: (payload) => config('post', '/cms-admin/v1/add-new-supplier/', payload),
  updateSupplier: (payload) => config('post', '/cms-admin/v1/update-supplier/', payload.data),
  deleteSupplier: (payload) => config('post', '/cms-admin/v1/delete-supplier/', payload),

});

export default api;
