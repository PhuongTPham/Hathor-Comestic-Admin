import Vue from 'vue';
import Vuex from 'vuex';

import htmlClass from './htmlclass.module';
import config from './config.module';
import account from './account';
import tenant from './tenant';
import chunha from './chunha';
import khachthue from './khachthue';
import canho from './canho';
import toanha from './toanha';
import service from './service';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    htmlClass,
    config,
    account,
    tenant,
    chunha,
    khachthue,
    canho,
    toanha,
    service
  },
});
