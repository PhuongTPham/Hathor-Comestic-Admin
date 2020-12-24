import api from '../api/api';

export default {
  namespace: true,
  state: {
    listProduct: [],
    errorCode: null,
    imagesUrl: null
  },
  getters: {
    getListProducts: (state) => state.listProduct,
    getErrorCodeProduct: (state) => state.errorCode,
    getImagesUrl: (state) => state.imagesUrl,
  },
  mutations: {
    SET_LIST_PRODUCT(state, payload) {
      state.listProduct = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.errorCode = payload;
    },
    SET_IMAGES_URL(state, payload) {
      state.imagesUrl = payload
    },
    RESET_IMAGES_URL(state) {
      state.imagesUrl = null
    },
  },
  actions: {
    async getProduct({ commit }, payload) {
      const response = await api('getListProduct', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_PRODUCT', response.data.data);
      } else {
        // show message failed
      }
    },
    async deleteProduct({ commit }, payload) {
      const response = await api('deleteProduct', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async addProduct({ commit }, payload) {
      const response = await api('createProduct', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async updateProduct({ commit }, payload) {
      const response = await api('updateProduct', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async uploadImage({ commit }, payload) {
      const response = await api('uploadImage', payload);
      if (response.data.error_code === 0) {
        commit('SET_IMAGES_URL', response.data.data[0].url_image);
      } else {
        // show message failed
      }
      commit('SET_ERROR_CODE', response.data.error_code);
    },
  },
};
