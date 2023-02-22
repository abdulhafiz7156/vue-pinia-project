import {defineStore} from "pinia"
import { useMovieStore } from "./MovieStore.js";
import {ref} from 'vue'

const url = 'https:api.themoviedb.org/3/search/movie?api_key=d63af17b7211aceaced178f0aa24e205&query='

export const useSearchStore = defineStore("searchStore", () => {
    const loader = ref(false)
    const movies = ref([])
    const forText = ref(false)

    const getMovies = async(search, year) => {
        loader.value = true
        const res = await fetch(`${url}${search}`)
        const data = await res.json()
        movies.value = data.results.filter((item)=> {
            console.log(item.release_date.slice(0,4))
            if (item.release_date.slice(0,4) === year) {
                return item
            } else {
                console.log("ishlamayabdi")
            }
        })
        if (movies.value.length === 0) {
            forText.value = true
        } else {
            forText.value = false
        }
        loader.value = false
    }
    const addToUserMovies = (object) => {
        const movieStore = useMovieStore()
        movieStore.movies.push({...object, isWatched: false})
        movieStore.activeTab = 1
    }


    return {
        loader, movies, getMovies, addToUserMovies, forText
    }
})