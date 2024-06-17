<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import type { Show } from '@/Show'
import xss from 'xss'

type Props = {
  show: Show
}

defineProps<Props>()

const emit = defineEmits<{
  'close-modal': [value: boolean]
}>()

function closeModal() {
  emit('close-modal', true)
}
</script>

<template>
  <div class="fixed z-50 inset-0 bg-gray-600 bg-opacity-60 overflow-y-auto w-full">
    <div class="absolute right-0 shadow-xl bg-white md:max-w-xl w-full min-h-screen flex flex-col" v-on-click-outside="closeModal">
      <div class="self-end p-4 pb-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hover:text-gray-400" @click="closeModal" data-testid="close-tv-show">
          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>

      <div class="flex p-4 pb-8">
        <div>
          <img :src="show.image.original" class="rounded h-[28rem]" />
        </div>

        <div class="p-4 flex flex-col gap-2">
          <h1 class="text-4xl font-semibold" data-testid="show-title">{{ show.name }}</h1>

          <div>
            <span data-testid="show-premiered">{{ show.premiered.substring(0, 4) }}</span>
            <span data-testid="show-ended" v-if="show.ended !== null"> - {{ show.ended.substring(0, 4) }}</span><span v-else> - Now</span>
          </div>

          <div class="flex gap-2" data-testid="show-genres">
            <h2 class="text-xs" v-for="genre in show.genres">{{ genre }}</h2>
          </div>

          <h6 class="text-xs" data-testid="show-averageRuntime">{{ show.averageRuntime }} min.</h6>
        </div>
      </div>
      <div class="p-4">
        <div class="flex gap-2 pb-4">
          <span class="text-xs text-nowrap" v-if="show.rating.average !== null">({{ show.rating.average }} / 10)</span>
          <a class="hover:opacity-65 hover:transition-all" :href="`https://www.imdb.com/title/${show.externals.imdb}`" target="_blank"><img class="w-10 h-4" src="/images/externals/imdb.png" /></a>
          <a class="hover:opacity-65 hover:transition-all" :href="`https://www.thetvdb.com/dereferrer/series/${show.externals.thetvdb}`" target="_blank"><img class="w-10 h-4" src="/images/externals/thetvdb.png" /></a>
          <!-- <img class="w-10 h-4" src="/images/externals/tvrage.png" /> -->
        </div>
        <div v-html="xss(show.summary)"></div>
      </div>
    </div>
  </div>
</template>
