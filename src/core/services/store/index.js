import Vue from 'vue';
import Vuex from 'vuex';

import htmlClass from './htmlclass.module';
import config from './config.module';
import account from './account';
import category from './category';
import order from './order';
import product from './product';
import supplier from './supplier';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    htmlClass,
    config,
    account,
    category,
    order,
    product,
    supplier,
  },
});
