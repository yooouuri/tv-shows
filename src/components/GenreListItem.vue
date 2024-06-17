<script setup lang="ts">
type Props = {
  genre: string
}

defineProps<Props>()

const emit = defineEmits<{
  'changeGenre': [ genre: string ]
}>()

function changeGenre(genre: string) {
  emit('changeGenre', genre)
}
</script>

<template>
  <li data-testid="genre" class="rounded p-2 bg-slate-50 hover:opacity-60 hover:transition-all flex-shrink-0 hover:cursor-pointer" @click="changeGenre(genre)">{{ genre }}</li>
</template>
