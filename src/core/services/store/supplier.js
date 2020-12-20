import api from '../api/api';

export default {
  namespace: true,
  state: {
    listSupplier: [],
    errorCode: null,
  },
  getters: {
    getlistSupplier: (state) => state.listSupplier,
    getErrorCodeSupplier: (state) => state.errorCode,
  },
  mutations: {
    SET_LIST_SUPPLIER(state, payload) {
      state.listSupplier = payload;
    },
    SET_ERROR_CODE_SUPPLIER(state, payload) {
      state.errorCode = payload;
    },
  },
  actions: {
    async getListSupplier({ commit }, payload) {
      const response = await api('getListSupplier', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_SUPPLIER', response.data.data);
      } else {
        commit('SET_ERROR_CODE_SUPPLIER', response.data.error_code);
      }
    },
    async addSupplier({ commit }, payload) {
      const response = await api('addSupplier', payload);
      commit('SET_ERROR_CODE_SUPPLIER', response.data.error_code);
    },
    async updateSupplier({ commit }, payload) {
      const response = await api('updateSupplier', payload);
      commit('SET_ERROR_CODE_SUPPLIER', response.data.error_code);
    },
    async deleteSupplier({ commit }, payload) {
      const response = await api('deleteSupplier', payload);
      commit('SET_ERROR_CODE_SUPPLIER', response.data.error_code);
    },
  },
};
