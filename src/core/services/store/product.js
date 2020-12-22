import api from '../api/api';

export default {
  namespace: true,
  state: {
    listProduct: [],
  },
  getters: {
    getListProducts: (state) => state.listProduct,
  },
  mutations: {
    SET_LIST_PRODUCT(state, payload) {
      state.listProduct = payload;
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
    // async updateAccount(payload) {
    //   const response = await api('updateAccount', payload);
    //   if (response.data.error_code === 0) {
    //     // commit('SET_LIST_ACCOUNT', response.data.data);
    //   } else {
    //     // show message failed
    //   }
    // },
  },
};
