import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    title: "",
    loading: false,
    movies: [],
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
  actions: {
    async searchMovies({state, commit}) {
      try {
        // state.loading = true;
        commit("updateState", {loading: true});
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=f6842dd7&s=${state.title}`
        );
        console.log(response.data);
        commit("updateState", {movies: response.data.Search, loading: false});
      } catch (e) {
        console.error(e);
      }
    },
  },
};
