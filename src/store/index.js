import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    likedFlats: [],
  },
  mutations: {
    SET_FLAT_LIKED(state, { id, liked }) {
      const index = state.likedFlats.indexOf(id);
      if (index === -1 && liked) {
        state.likedFlats.push(id);
        return;
      }

      if (index > -1 && !liked) {
        state.likedFlats.splice(index, 1);
      }
    },
    SET_LIKED_FLATS(state, likedFlats) {
      state.likedFlats = likedFlats;
    },
  },
  actions: {
    setFlatLiked({ commit }, { id, liked }) {
      commit("SET_FLAT_LIKED", { id, liked });
    },
    setLikedFlats({ commit }, likedFlats) {
      commit("SET_LIKED_FLATS", likedFlats);
    },
  },
  getters: {
    getLikedFlats(state) {
      return state.likedFlats;
    },
  },
});
