import * as types from '@/constants/mutation-names';

const state = {
  searchHistoryData:[]
};

/* gets data from store in a fancy way */
const getters = {
  getCompleteHistory : state => state.searchHistoryData
};

/* execute actions to mutate data */
const actions = {
  [types.SAVE_GIPHY_HISTORY]({commit, state}, data){
    commit(types.SAVE_GIPHY_HISTORY, data);
  }
}

/* mutates the state of the vue store app */
const mutations = {
  [types.SAVE_GIPHY_HISTORY](state, data){
    console.log(data)
    state.searchHistoryData.push(data.searchTerm);
  }
};

/* Exporting the State for Giphy Module*/
export default {
  state 
  , getters
  , actions
  , mutations
}