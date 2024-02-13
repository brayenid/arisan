<script lang="ts" setup>
  import { DataSource } from '@/utils/Data'
  import { emitter } from '@/utils/EventBus'
  import type { Data } from '@/utils/Types'
  import { ref, onMounted, onUnmounted } from 'vue'
  import Swal from 'sweetalert2'
  const dataSource = new DataSource('members')
  const datas = ref<Data[]>([])

  const callData = (): void => {
    datas.value = dataSource.getData()
  }

  const removeData = async (id: string): Promise<void> => {
    const { isConfirmed } = await Swal.fire({
      title: 'Yakin menghapus anggota?',
      icon: 'question',
      confirmButtonText: 'Hapus',
      showCancelButton: true,
      cancelButtonText: 'Batal'
    })

    if (isConfirmed) {
      dataSource.removeData(id)
      emitter.emit('update-member')
      Swal.fire({
        title: 'Berhasil!',
        text: 'Anggota berhasil dihapus',
        icon: 'success',
        showConfirmButton: true
      })
    }
  }

  onMounted(() => {
    callData()
    emitter.on('update-member', (): void => {
      callData()
    })
  })

  onUnmounted(() => {
    emitter.off('update-member')
  })
</script>

<style lang="postcss" scoped>
  .red {
    @apply bg-red-300;
  }
</style>

<template>
  <div class="text-center mt-4 p-4">
    <div
      class="bg-emerald-200 hover:opacity-80 transition-all p-2 rounded-lg inline-block m-1 cursor-pointer"
      :class="{ red: data.selected }"
      v-for="(data, key) in datas"
      :key="key">
      <p @click="removeData(data?.id as string)">{{ data.name }}</p>
    </div>
  </div>
</template>
