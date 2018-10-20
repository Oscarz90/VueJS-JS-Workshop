<template>
  <div class="giphysearch" ref="a">
    <h1>My Gif Search</h1>
    <input type="text"
      v-model="searchTerm"/>
    <input type="number" min="5" max="20" v-model="customLimit"/>
    <button class="button" @click="searchGifs()">Search</button>
    <pre>{{gifs}}</pre>
    <pre>{{getHistory}}</pre>
    <div class="gif-container">
      <img v-for="gif in gifs" :src="gif" :key="gif.id">
    </div>
  </div>
</template>

<script>
import  GiphyAPI from "@/services/giphy";
import * as types from '@/constants/mutation-names';

/**
 * Function's Description
 * @param {}
 * @return {}
 * TODO:
 * FIXME:
 */
const filterGifsFromAPIResponse = response=>{
  return response.data.data
    .map(gif=>gif.id)
    .map(gifID=>`https://media.giphy.com/media/${gifID}/giphy.gif`)
    
}
export default {
  name:'GiphySearch'
  //concised methods
  , data(){
    return {
      searchTerm:""
      , gifs: []
      , customLimit:5
    }
  }
  , methods:{
    //ES6 concised methods
    async searchGifs(){
      try{
        const response = await GiphyAPI.search(this.searchTerm);
        console.info(response)
        this.gifs = filterGifsFromAPIResponse(response);
        
        this.$store.dispatch(types.SAVE_GIPHY_HISTORY, {response, searchTerm:this.searchTerm});
        console.log(this.$store)
      }catch(error){
        console.error(error)
      }
    }
    
  }
  , computed:{
    getHistory(){
      return this.$store.getters.getCompleteHistory
    }
  }
  , components:{

  }
  , created() {
    console.info("created")
    console.info(this.$store)
  }
  , beforeCreate() {
    console.group("View Creation")
    console.time("creating giphy search view")
    console.info("beforeCreate")
  }
  , mounted() {
    console.info("mounted")
    console.timeEnd("creating giphy search view")
    
    console.groupEnd()
  }
  , beforeUpdate() {
    
  }
  , updated() {
    
  },

}  
</script>
<style scoped>
input {
  padding: 5px;
  margin-bottom: 20px;
}

.button {
  background-color: rgb(7, 181, 232);
  color: white;
  padding: 5px 20px;
  border: none;
  display: block;
  margin: 0 auto;
}

.button:hover {
  background-color: rgb(11, 148, 214);
}
</style>

