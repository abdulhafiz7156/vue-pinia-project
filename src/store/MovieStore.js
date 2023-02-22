import {defineStore} from "pinia";
import {ref, computed, watch} from "vue"


export const useMovieStore = defineStore('movieStore', () => {
    const movies = ref([])
    const activeTab = ref(2)

    const watchedMovies = computed(()=> {
       return movies.value.filter((el) => el.isWatched)
    })

    const totalCountMovies = computed(() => movies.value.length)

    const setActiveTab = (id) => {
        activeTab.value = id
    }

    const toggleWatched = (id) => {
        const idx = movies.value.findIndex((el) => el.id === id)
        movies.value[idx].isWatched = !movies.value[idx].isWatched
    }

    const deleteMovie = (id) => {
        movies.value = movies.value.filter((el) => el.id !== id)
    }

    const movieOnLocalStorage = localStorage.getItem('movies')
    if(movieOnLocalStorage) {
        movies.value = JSON.parse(movieOnLocalStorage)._value
    }

    watch(() => movies, (state) => {
        localStorage.setItem('movies', JSON.stringify((state)))
    }, {deep: true})

    return {
        movies, activeTab, watchedMovies, totalCountMovies, toggleWatched, deleteMovie, setActiveTab
    }
})