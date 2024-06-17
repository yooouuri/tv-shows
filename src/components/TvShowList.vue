<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import type { Show } from '@/Show'
import TvShowListItem from './TvShowListItem.vue'

type Props = {
  shows: Show[] | null
  genres: string[] | null
  genre: string
}

const props = defineProps<Props>()

const swiper = ref<HTMLElement | null>()

let swiperInstance: Swiper | null = null

onMounted(() => {
  swiperInstance = new Swiper(swiper.value!, {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    modules: [Navigation],
    slidesPerView: 'auto',
  })
})

watch(() => props.shows, () => {
  swiperInstance?.slideTo(0)
})

const emit = defineEmits<{
  'openShow': [ id: number ]
}>()

function openShow(id: number) {
  emit('openShow', id)
}
</script>

<template>
  <h1 class="pl-4 md:p-0 font-semibold" data-testid="selected-genre" v-if="genre !== '' || genres?.includes(genre)">
    {{ genre }}
  </h1>
  <h1 class="pl-4 md:p-0 text-slate-300" data-testid="no-genre" v-else>
    No genre selected
  </h1>

  <div class="pt-4" v-if="shows === null">
    Loading...
  </div>
  <template v-else>
    <div class="text-center p-10 text-slate-300" v-if="shows.length === 0">
      No TV shows found, try a different search term perhaps
    </div>
  </template>

  <div ref="swiper" class="swiper">
    <div class="swiper-wrapper" data-testid="tv-shows">
      <div class="swiper-slide" data-testid="tv-show-in-grid" v-for="show in shows" :key="show.id">
        <TvShowListItem :name="show.name" :average-rating="show.rating.average" :image="show.image.original" @open-show="openShow(show.id)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-wrapper {
  @apply gap-0 md:gap-4;
}

.swiper-slide {
  @apply w-full md:w-fit;
}

.swiper-button-next, .swiper-button-prev {
  @apply p-8 bg-black rounded-full;

  &:after {
    @apply text-slate-100 text-3xl hover:opacity-85;
  }
}
</style>
