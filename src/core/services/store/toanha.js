import api from '../api/api';

export default {
  namespace: true,
  state: {
    listToaNha: [],
  },
  getters: {
    getlistToaNha: (state) => state.listToaNha,
  },
  mutations: {
    SET_LIST_TOANHA(state, payload) {
      state.listToaNha = payload;
    },
  },
  actions: {
    async getBuilding({ commit }, payload) {
      const response = await api('getToaNha', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_TOANHA', response.data.data);
      } else {
        // show message failed
      }
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
