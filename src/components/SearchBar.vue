<template>
    <div>
        <v-text-field
         v-model="title"
         outlined
         @keypress.enter="searchMovies"
         >
         <template v-slot:prepend-inner>
             <v-icon>search</v-icon>
         </template>
         <template v-slot:append>
             <v-progress-circular
                v-if='loading'
                size='24'
                color='primary'
                indeterminate
              />
         </template>
        </v-text-field>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            title:'',
            loading:false,
        }
    },
    methods:{
        searchMovies(){
            console.log('search')
            this.loading = true
            axios.get(`http://www.omdbapi.com/?apikey=f6842dd7&s=${this.title}`)
                .then((response)=>{
                    this.loading = false
                    console.log(response.data)
                    })
                .catch((e)=>console.error(e))
        }
    }
}
</script>