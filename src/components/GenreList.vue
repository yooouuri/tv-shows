<script setup lang="ts">
import { computed, ref } from 'vue'
import GenreListItem from './GenreListItem.vue'

type Props = {
  genres: string[] | null
}

const props = defineProps<Props>()

const genresOverview = computed(() => props.genres !== null ? props.genres.slice(0, 3) : null)

const showAllGenres = ref(false)

const emit = defineEmits<{
  'changeGenre': [ genre: string ]
}>()

function changeGenre(genre: string) {
  if (showAllGenres.value) {
    showAllGenres.value = false
  }

  emit('changeGenre', genre)
}
</script>

<template>
  <div class="my-2 mx-4 md:m-0 md:flex">
    <h1 class="font-semibold self-center">Genres</h1>
  </div>
  <div class="flex md:items-center md:justify-between flex-1">
    <div class="flex gap-4 md:items-center relative">
      <ul class="flex gap-2 w-full md:w-fit ml-4 md:ml-2 lg:ml-4 items-center " data-testid="first-genres">
        <template v-if="genresOverview === null">
          <div class="animate-pulse w-14 bg-slate-50 self-stretch"></div>
          <div class="animate-pulse w-14 bg-slate-50 self-stretch"></div>
          <div class="animate-pulse w-14 bg-slate-50 self-stretch"></div>
        </template>
        <GenreListItem v-for="genre in genresOverview" :genre="genre" @change-genre="changeGenre" v-else />
      </ul>

      <a class="text-xs cursor-pointer self-center" data-testid="show-more-genres" @click="showAllGenres = !showAllGenres">More...</a>

      <Transition>
        <ul class="absolute z-10 flex gap-2 w-screen md:w-full shadow-lg md:rounded-b-lg md:top-0 overflow-hidden flex-wrap bg-white p-4 pt-0" data-testid="all-genres" v-if="showAllGenres">
          <GenreListItem v-for="genre in genres" :genre="genre" @change-genre="changeGenre" />
          <li class="flex items-center content-center text-xs">
            <a class="cursor-pointer" @click="showAllGenres = !showAllGenres" data-testid="hide-genres">Hide</a>
          </li>
        </ul>
      </Transition>
      
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 150ms linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
