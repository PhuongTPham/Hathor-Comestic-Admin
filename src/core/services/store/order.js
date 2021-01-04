import api from '../api/api';

export default {
  namespace: true,
  state: {
    orders: [],
    error_code: null,
  },
  getters: {
    getOrders: (state) => state.orders,
    getErrorCodeOrder: (state) => state.error_code,
  },
  mutations: {
    SET_ORDERS(state, payload) {
      state.orders = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.error_code = payload;
    },
  },
  actions: {
    async getOrders({ commit }, payload) {
      const response = await api('getListOrder', payload);
      if (response.data.error_code === 0) {
        commit('SET_ORDERS', response.data.data);
      } else {
        commit('SET_ERROR_CODE', response.data.error_code);
      }
    },
    async updateStatusOrder({ commit }, payload) {
      const response = await api('updateStatusOrder', payload);
      commit('SET_ERROR_CODE', response.data.error_code);
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
