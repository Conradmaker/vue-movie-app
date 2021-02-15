<template>
  <v-app>
    <!-- vuetify를 사용하기 위해는 v-app아래에 그려줘야 한다 -->
    <v-container>
      <!-- 검색바 -->
      <search-bar />
      <!-- 에러메시지 -->
      <error-message />
      <!-- 영화목록 -->
      <movie-list />
    </v-container>
  </v-app>
</template>

<script>
import SearchBar from '@/components/SearchBar';
import MovieList from '@/components/MovieList';
import ErrorMessage from './components/ErrorMessage.vue';
export default {
  components: {
    SearchBar,
    MovieList,
    ErrorMessage,
  },
};
</script>
