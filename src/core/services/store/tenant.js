import api from '../api/api';

export default {
  namespace: true,
  state: {
    listTenant: [],
  },
  getters: {
    getListTenant: (state) => state.listTenant,
  },
  mutations: {
    SET_LIST_TENANT(state, payload) {
      state.listTenant = payload;
    },
  },
  actions: {
    async getTenant({ commit }, payload) {
      const response = await api('getTenant', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_TENANT', response.data.data);
      } else {
        // show message failed
      }
    },
  },
};
