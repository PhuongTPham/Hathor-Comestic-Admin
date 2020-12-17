import api from '../api/api';

export default {
  namespace: true,
  state: {
    listChuNha: [],
  },
  getters: {
    getlistChuNha: (state) => state.listChuNha,
  },
  mutations: {
    SET_LIST_CHUNHA(state, payload) {
      state.listChuNha = payload;
    },
  },
  actions: {
    async getHost({ commit }, payload) {
      const response = await api('getChuNha', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_CHUNHA', response.data.data);
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
