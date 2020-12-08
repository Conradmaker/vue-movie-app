<template>
<!-- 반복되는 아이템 부모요소에 아래 두개속성 -->
    <v-row
     v-masonry
     item-selector=".item">
     <!-- 반복되는 자식요소에 클래스와 타일 -->
        <v-col 
        v-for='movie in movies' 
        :key="movie.imdbID"
        v-masonry-tile
        class="item"
        cols="12"
        xl="2"
        lg="3"
        md="6"
        sm="12">
        <v-card>
            <v-img
            :src="posterSrc(movie.Poster)"
            :alt="movie.Title"
            :height="posterHeight(movie.Poster)">
                <template v-slot:placeholder>
                    <div style="background: lightgray; height: 100%;"></div>
                </template>
            </v-img>
            <v-card-title>
                {{movie.Title}}
            </v-card-title>
            <v-card-subtitle>
                {{movie.Year}}
            </v-card-subtitle>
        </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed:{
        movies(){
            return this.$store.state.movie.movies
        }
    },
    methods: {
    posterSrc (poster) {
      return poster === 'N/A' ? '' : poster
    },
    posterHeight (poster) {
      return poster === 'N/A' ? 100 : 300
    }
  }
}
</script>