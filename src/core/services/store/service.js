import api from '../api/api';

export default {
  namespace: true,
  state: {
    listService: [],
  },
  getters: {
    getlistService: (state) => state.listService,
  },
  mutations: {
    SET_LIST_DV(state, payload) {
      state.listService = payload;
    },
  },
  actions: {
    async getService({ commit }, payload) {
      const response = await api('getService', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_DV', response.data.data);
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
