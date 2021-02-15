import { expect } from '@jest/globals';
import movie from '../movie';
import _cloneDeep from 'lodash/cloneDeep';
import axios from 'axios';

/*
아래처럼 모듈을 목모듈로 만들면 아래처럼 바로 쓸 수 있다.
jest.mock('axios');
axios.get.mockRejectedValue(new Error('Network Error!'));
*/
describe('movie store', () => {
  let store;
  beforeEach(() => {
    //참조관계 없도록
    store = _cloneDeep(movie);
    store.state = movie.state();
    //this.$store.commit('NAME',payload)
    store.commit = function (name, payload) {
      store.mutations[name](store.state, payload);
    };
    store.dispatch = function (name, payload) {
      const context = {
        state: store.state,
        commit: store.commit,
        dispatch: store.dispatch,
      };
      //dispatch는 action을 실행하기 때문에 비동기여야 한다.
      return store.actions[name](context, payload);
    };
  });

  test('state 업데이트', () => {
    // movie.mutations.updateState(state, { loading: true });
    store.commit('updateState', {
      loading: true,
      title: 'hello',
      movies: [1, 2, 3],
    });
    expect(store.state.loading).toBe(true);
    expect(store.state.title).toBe('hello');
    expect(store.state.movies).toEqual([1, 2, 3]);
  });

  test('영화 목록에 push', () => {
    expect(store.state.movies).toEqual([]);
    store.commit('pushIntoMovies', [{ Title: '영화 제목' }]);
    expect(store.state.movies).toEqual([{ Title: '영화 제목' }]);
  });

  test('영화 목록을 잘 가져왔을 경우', async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: {
        Search: [
          {
            imdbID: '123456',
            Poster: 'image.jpg',
            Title: '영화 제목',
            Year: '2021',
          },
        ],
        totalResults: '1',
      },
    });
    await store.dispatch('searchMovies');
    expect(store.state.movies).toEqual([
      {
        imdbID: '123456',
        Poster: 'image.jpg',
        Title: '영화 제목',
        Year: '2021',
      },
    ]);
  });

  test('영화목록을 가져오지 못했을때', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error('Network Error!'));
    await store.dispatch('searchMovies');
    expect(store.state.error).toEqual(new Error('Network Error!'));
    expect(store.state.error).toHaveProperty('message', 'Network Error!');
  });
});
