import api from '../api/api';

export default {
  namespace: true,
  state: {
    listCategory: [],
    errorCode: null,
  },
  getters: {
    getlistCategory: (state) => state.listCategory,
    getErrorCodeCategory: (state) => state.errorCode,
  },
  mutations: {
    SET_LIST_CATEGORY(state, payload) {
      state.listCategory = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.errorCode = payload;
    },
  },
  actions: {
    async getListCategory({ commit }, payload) {
      const response = await api('getListCategory', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_CATEGORY', response.data.data);
      } else {
        // show message failed
      }
    },
    async addCategory({ commit }, payload) {
      const response = await api('createCategory', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async updateCategory({ commit }, payload) {
      const response = await api('updateCategory', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async deleteCategory({ commit }, payload) {
      const response = await api('deleteCategory', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
  },
};
