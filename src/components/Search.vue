<template>
  <form>
    <label for="name">Name</label>
    <input type="text" id="name" class="search-input" placeholder="Input movie" v-model="searchMovie">
    <label for="year">Year</label>
    <input type="text" id="year" placeholder="Input movie" class="search-input" v-model="searchMovieYear">
  </form>
  <button @click="searchStore.getMovies(searchMovie,searchMovieYear)" class="click__button">click</button>
  <Loader v-if="searchStore.loader" />
  <div v-else>
    <div v-if="searchStore.forText">
        Found nothing! try looking for another year.
    </div>
    <Movie v-for="movie of searchStore.movies" :key="movie.id" :movie="movie" :is-search="true" />
  </div>
</template>

<script setup>
import Loader from "./Loader.vue"
import Movie from "./Movie.vue"
import {ref} from "vue"
import {useSearchStore} from "../store/SearchStore";

const searchStore = useSearchStore()
const searchMovie = ref('')
const searchMovieYear = ref()


</script>

<style scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.click__button {
  padding: 20px 50px;
  border-radius: 25px;
  border: none;

}
</style>