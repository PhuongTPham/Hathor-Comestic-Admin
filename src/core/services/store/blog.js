import api from '../api/api';

export default {
  namespace: true,
  state: {
    listBlog: [],
    errorCode: null,
  },
  getters: {
    getlistBlog: (state) => state.listBlog,
    getErrorCodeBlog: (state) => state.errorCode,
  },
  mutations: {
    SET_LIST_BLOG(state, payload) {
      state.listBlog = payload;
    },
    SET_ERROR_CODE_BLOG(state, payload) {
      state.errorCode = payload;
    },
  },
  actions: {
    async getListBlog({ commit }, payload) {
      const response = await api('getListBlog', payload);
      if (response.data.error_code === 0) {
        commit('SET_LIST_BLOG', response.data.data);
      } else {
        commit('SET_ERROR_CODE_BLOG', response.data.error_code);
      }
    },
    async addBlog({ commit }, payload) {
      const response = await api('addBlog', payload);
      commit('SET_ERROR_CODE_BLOG', response.data.error_code);
    },
    async updateBlog({ commit }, payload) {
      const response = await api('updateBlog', payload);
      commit('SET_ERROR_CODE_BLOG', response.data.error_code);
    },
    async deleteBlog({ commit }, payload) {
      const response = await api('deleteBlog', payload);
      commit('SET_ERROR_CODE_BLOG', response.data.error_code);
    },
  },
};
