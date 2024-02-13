<script lang="ts" setup>
  import NameShufler from '@/components/NameShufler.vue'
  import { DataSource } from '../utils/Data'
  import type { Data } from '../utils/Types'
  import { ref } from 'vue'
  import { emitter } from '@/utils/EventBus'

  const dataSource = new DataSource('members')
  const data = ref<Data[]>([])

  data.value = dataSource.getData()

  emitter.on('update-member', () => {
    data.value = dataSource.getData()
  })
</script>

<template>
  <NameShufler />
</template>
