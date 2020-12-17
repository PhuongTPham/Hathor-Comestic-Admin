import api from '../api/api';

export default {
  namespace: true,
  state: {
    listKhachThue: [],
  },
  getters: {
    getlistKhachThue: (state) => state.listKhachThue,
  },
  mutations: {
    SET_LIST_KHACHTHUE(state, payload) {
      state.listKhachThue = payload;
    },
  },
  actions: {
    async getGuest({ commit }, payload) {
      const response = await api('getKhachThue', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_KHACHTHUE', response.data.data);
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
