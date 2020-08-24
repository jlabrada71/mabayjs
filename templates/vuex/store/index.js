import Vue from 'vue';
import Vuex from 'vuex';
import Order from '../../orders/lib/order';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pruebita: null,
    shoppingCart: null,
  },
  mutations: {
    set_pruebita: (state, payload) => {
      state.pruebita = payload;
    },
    addOrderItem: (state, payload) => {
      if (state.shoppingCart === null) {
        state.shoppingCart = new Order();
      }
      state.shoppingCart.addOrderItem(payload);
    },
  },
  actions: {
    set_pruebita: (context, payload) => {
      context.commit('set_pruebita', payload);
    },
    addOrderItem: (context, payload) => {
      context.commit('addOrderItem', payload);
    },
  },
  getters: {
    pruebita: (state) => state.pruebita,
    shoppingCart: (state) => state.shoppingCart,
  },
  modules: {
  },
});
