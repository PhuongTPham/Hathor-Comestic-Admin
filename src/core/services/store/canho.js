import api from '../api/api';

export default {
  namespace: true,
  state: {
    listCanHo: [],
  },
  getters: {
    getlistCanHo: (state) => state.listCanHo,
  },
  mutations: {
    SET_LIST_CANHO(state, payload) {
      state.listCanHo = payload;
    },
  },
  actions: {
    async getAppartment({ commit }, payload) {
      const response = await api('getCanHo', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_CANHO', response.data.data);
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
