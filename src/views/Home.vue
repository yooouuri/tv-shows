<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Show } from '@/Show'
import TvShowModal from '@/components/TvShowModal.vue'
import TvShowList from '@/components/TvShowList.vue'
import GenreList from '@/components/GenreList.vue'

type State = {
  shows: Show[] | null
  show: Show | null
  error: boolean
}

const state = reactive<State>({
  shows: null,
  show: null,
  error: false,
})

// there is no genres endpoint, so we need to compute the genres from shows
const genres = computed(() => state.shows ? [ ...new Set<string>(state.shows?.flatMap(show => show.genres)) ] : null)

const router = useRouter()

const genre = computed(() => router.currentRoute.value.params.genre as string)

const search = ref('')

const shows = computed(() => {
  let shows = state.shows

  if (shows === null) return null

  if (genre.value !== '' && genres.value?.includes(genre.value)) {
    shows = shows.filter(show => show.genres.includes(genre.value))
  }

  if (search.value !== '') {
    shows = shows.filter(show => show.name.includes(search.value))
  }

  return shows.sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
})

onMounted(async () => {
  try {
    const res = await fetch('https://api.tvmaze.com/shows')

    state.shows = await res.json() as Show[]
  } catch (e) {
    state.error = true
  }
})

async function changeGenre(genre: string) {
  await router.replace(`/${genre}`)

  search.value = ''
}

async function openShow(id: number) {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)

  state.show = await res.json() as Show

  document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden')
}

function closeModal() {
  state.show = null

  document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
}
</script>

<template>
  <div class="container mx-auto md:mt-10">
    <nav class="md:flex mb-10 w-full flex-wrap">
      <header class="flex items-center md:mr-10 my-8 md:my-0 w-full md:w-fit justify-center md:justify-normal">
        <img src="/images/logo.png" class="h-12" />
      </header>

      <GenreList :genres="genres" @change-genre="changeGenre" />

      <div class="my-2 mx-4 md:m-0 w-40 lg:w-fit">
        <input class="w-full border border-slate-200 rounded-md p-2 text-md placeholder:text-slate-400 text-slate-700 placeholder:text-sm" type="text" placeholder="Search TV shows" v-model="search" />
      </div>
    </nav>

    <div class="text-center p-10 text-slate-300" v-if="state.error">
      Failed to retreive tv shows, please try again
    </div>
    <template v-else>
      <TvShowList :shows="shows" :genre="genre" :genres="genres" @open-show="openShow" />
    </template>
  </div>

  <Transition>
    <TvShowModal :show="state.show" @closeModal="closeModal" v-if="state.show !== null" />
  </Transition>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
