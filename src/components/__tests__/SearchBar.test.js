import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
// import Vuex from 'vuex';
import store from '@/store';
import SearchBar from '../SearchBar';

const localVue = createLocalVue();
localVue.use(Vuetify);
// 가짜 스토어를 연결할 경우
// localVue.use(Vuex)

// const store = new Vuex({
//     modules:{

//     }
// })
describe('SearchBar Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(SearchBar, { localVue, store });
  });
  test('제목을 입력하면 스토어가 업데이트', () => {
    wrapper.vm.title = 'lion';
    expect(wrapper.vm.title).toBe('lion');
  });

  test('로딩중 아이콘 확인', async () => {
    wrapper.vm.$store.commit('movie/updateState', {
      loading: true,
    });
    //실제 화면에 렌더링되는 시간을 보장하기 위해
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-progress-circular').exists()).toBe(true);
  });
});
