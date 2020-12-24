import api from '../api/api';

export default {
  namespace: true,
  state: {
    listAccount: [],
    errorCode: 0,
    listAllStatistic: [],
  },
  getters: {
    getListAccount: (state) => state.listAccount,
    getErrorCode: (state) => state.errorCode,
    getListStatistic: (state) => state.listAllStatistic,

  },
  mutations: {
    SET_LIST_ACCOUNT(state, payload) {
      state.listAccount = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.errorCode = payload;
    },
    SET_LIST_STATISTIC(state, payload) {
      state.listAllStatistic = payload;
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
    async getAllStatistic({ commit }, payload) {
      const response = await api('getAllStatistic', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_STATISTIC', response.data.data);
      } else {
        // show message failed
      }
    },
    async updateAccount({ commit }, payload) {
      const response = await api('updateAccount', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async changeRoleAccount({ commit }, payload) {
      const response = await api('changeRoleAccount', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
      return response;
    },
  },
};
