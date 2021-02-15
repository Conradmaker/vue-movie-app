import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    title: '',
    loading: false,
    error: null,
    movies: [],
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      });
    },
    pushIntoMovies(state, movies) {
      state.movies.push(...movies);
    },
  },
  actions: {
    fetchMovies({ state, commit }, pageNum) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(
            `https://www.omdbapi.com/?apikey=f6842dd7&s=${state.title}&page=${pageNum}`
          );
          commit('pushIntoMovies', response.data.Search);
          resolve(response.data);
        } catch (e) {
          reject(e);
        }
      });
    },
    async searchMovies({ state, commit, dispatch }) {
      commit('updateState', { loading: true, movies: [], error: null });
      try {
        // state.loading = true;
        const { totalResults } = await dispatch('fetchMovies', 1);
        const pageLength = Math.ceil(totalResults / 10);

        if (pageLength > 1) {
          for (let i = 2; i <= pageLength; i++) {
            if (i > 4) break;
            await dispatch('fetchMovies', i);
          }
        }
      } catch (e) {
        console.error(e);
        commit('updateState', { error: e });
      } finally {
        commit('updateState', { loading: false });
      }
    },
  },
};
