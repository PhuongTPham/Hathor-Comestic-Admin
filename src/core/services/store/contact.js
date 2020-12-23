import api from '../api/api';

export default {
  namespace: true,
  state: {
    listContact: [],
    errorCode: null,
    listComment: [],
  },
  getters: {
    getlistContact: (state) => state.listContact,
    getErrorCodeContact: (state) => state.errorCode,
    listComment: (state) => state.listComment,
  },
  mutations: {
    SET_LIST_CONTACT(state, payload) {
      state.listContact = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.errorCode = payload;
    },
  },
  actions: {
    async getListContact({ commit }, payload) {
      const response = await api('getListContact', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_CONTACT', response.data.data);
      } else {
        // show message failed
      }
    },
    async deleteContact({ commit }, payload) {
      const response = await api('deleteContact', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async getListComment({ commit }, payload) {
      const response = await api('getListContact', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_CONTACT', response.data.data);
      } else {
        // show message failed
      }
    },
    async deleteComment({ commit }, payload) {
      const response = await api('deleteContact', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
  },
};
