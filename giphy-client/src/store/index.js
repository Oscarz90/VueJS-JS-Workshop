
import Vue from 'vue'
import Vuex from 'vuex'
import appData from "@/store/modules/app-data";

const {state, actions, mutations, getters} = appData;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...state
  }
  , mutations: {
    ...mutations
  }
  , actions: {
    ...actions
  }
  , getters:{
    ...getters
  }
})
