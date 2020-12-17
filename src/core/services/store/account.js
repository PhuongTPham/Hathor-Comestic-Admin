import api from '../api/api';

export default {
  namespace: true,
  state: {
    listAccount: [],
    errorCode: 0,
  },
  getters: {
    getListAccount: (state) => state.listAccount,
    getErrorCode: (state) => state.errorCode,
  },
  mutations: {
    SET_LIST_ACCOUNT(state, payload) {
      state.listAccount = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.errorCode = payload;
    },
  },
  actions: {
    async getAccount({ commit }, payload) {
      const response = await api('getAccount', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_ACCOUNT', response.data.data);
      } else {
        // show message failed
      }
    },
    async addAccount({ commit }, payload) {
      const response = await api('addAccount', payload);
      if (response.data.error_code === 0) {
        // commit('SET_LIST_ACCOUNT', response.data.data);
      } else {
        // show message failed
      }
    },
    async updateAccount({ commit }, payload) {
      const response = await api('updateAccount', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async deleteAccount({ commit }, payload) {
      const response = await api('deleteAccount', payload);
      if (response.data.error_code === 0) {
        // commit('SET_LIST_ACCOUNT', response.data.data);
      } else {
        // show message failed
      }
    },
  },
};
