import api from '../api/api';

export default {
  namespace: true,
  state: {
    listCategory: [],
  },
  getters: {
    getlistCategory: (state) => state.listCategory,
  },
  mutations: {
    SET_LIST_CATEGORY(state, payload) {
      state.listCategory = payload;
    },
  },
  actions: {
    async getListCategory({ commit }, payload) {
      const response = await api('getListCategory', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_CATEGORY', response.data.data);
      } else {
        // show message failed
      }
    },
  },
};
