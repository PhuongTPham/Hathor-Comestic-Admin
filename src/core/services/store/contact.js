import api from '../api/api';

export default {
  namespace: true,
  state: {
    listContact: [],
    errorCode: null,
    listComment: [],
    listSubscriber: [],
  },
  getters: {
    getlistContact: (state) => state.listContact,
    getErrorCodeContact: (state) => state.errorCode,
    getlistComment: (state) => state.listComment,
    getlistSubscriber: (state) => state.listSubscriber,
  },
  mutations: {
    SET_LIST_CONTACT(state, payload) {
      state.listContact = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.errorCode = payload;
    },
    SET_LIST_COMMENT(state, payload) {
      state.listComment = payload;
    },
    SET_LIST_SUBSCRIBER(state, payload) {
      state.listSubscriber = payload;
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
      const response = await api('getListComment', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_COMMENT', response.data.data);
      } else {
        // show message failed
      }
    },
    async getListSubscriber({ commit }, payload) {
      const response = await api('getListSubscriber', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_SUBSCRIBER', response.data.data);
      } else {
        // show message failed
      }
    },
    async deleteSubscriber({ commit }, payload) {
      const response = await api('deleteSubscriber', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
  },
};
