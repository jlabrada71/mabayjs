import Vue from 'vue';
import Vuex from 'vuex';
import Order from '../../orders/lib/order';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shoppingCart: null,
    currentUser: null,
  },
  mutations: {
    addOrderItem: (state, payload) => {
      if (state.shoppingCart === null) {
        state.shoppingCart = new Order();
      }
      state.shoppingCart.addOrderItem(payload);
    },
    login: (state, payload) => {
      state.currentUser = payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
  actions: {
    addOrderItem: (context, payload) => {
      context.commit('addOrderItem', payload);
    },
    login: (context, payload) => {
      context.commit('login', payload);
    },
    logout: (context, payload) => {
      context.commit('logout', payload);
    },
  },
  getters: {
    shoppingCart: (state) => state.shoppingCart,
    currentUser: (state) => state.currentUser,
  },
  modules: {
  },
});
