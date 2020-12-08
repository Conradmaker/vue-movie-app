<template>
    <v-row>
        <v-col 
        v-for='movie in movies' 
        :key="movie.imdbID"
        cols="12"
        xl="2"
        lg="3"
        md="6"
        sm="12">
        <v-card>
            <v-img 
                :src="movie.Poster"
                :alt="movie.Title">
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
    }
}
</script>