<script setup lang="ts">
type Props = {
  name: string
  averageRating: number | null
  image: string
}

defineProps<Props>()

const emit = defineEmits<{
  'openShow': []
}>()

function openShow() {
  emit('openShow')
}
</script>

<template>
  <div class="flex gap-4 py-4 items-center">
    <h1 class="font-semibold text-4xl px-4 md:px-0 truncate">{{ name }}</h1>
    <span class="text-xs text-nowrap" v-if="averageRating !== null">({{ averageRating }} / 10)</span>
  </div>

  <img class="shrink-0 cursor-pointer w-full md:w-96 md:h-[34rem] hover:opacity-85 hover:transition-all" :src="image" loading="lazy" @click="openShow" />
</template>
