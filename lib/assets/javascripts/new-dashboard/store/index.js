import Vue from 'vue';
import Vuex from 'vuex';
import CartoNode from 'carto-node';

// Store Modules
import user from './modules/user';
import config from './modules/config';
import maps from './modules/maps';
import datasets from './modules/data/datasets';
import catalog from './modules/data/catalog';
import search from './modules/search';
import notifications from './modules/notifications';
import recentContent from './modules/recent-content';
import oAuthApps from './modules/apps/oAuth';
import connectedApps from './modules/apps/connected';

Vue.use(Vuex);

const storeOptions = {
  state: {
    client: new CartoNode.AuthenticatedClient()
  },
  getters: {},
  modules: {
    config,
    user,
    maps,
    datasets,
    catalog,
    search,
    notifications,
    recentContent,
    oAuthApps,
    connectedApps
  }
};

export default new Vuex.Store(storeOptions);
