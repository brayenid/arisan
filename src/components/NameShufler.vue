<script lang="ts" setup>
  import { Timer } from '@/utils/Timer'
  import { type Data } from '@/utils/Types'
  import { onUnmounted, ref } from 'vue'
  import { DataSource } from '@/utils/Data'
  import Swal from 'sweetalert2'
  import IconShuffle from './icons/IconShuffle.vue'

  const dataSource = new DataSource('members')

  const notSelectedData = ref<Data[]>([])
  notSelectedData.value = dataSource.getNonSelected()

  const pickedData = ref<Data>({
    name: '--------'
  })
  let timer = new Timer(5000, notSelectedData.value, pickedData)

  const randomizeName = async (): Promise<void> => {
    const data = await timer.toggleRandomPick()

    if (data) {
      const { isConfirmed } = await Swal.fire({
        icon: 'question',
        title: 'Konfirmasi',
        text: `Konfirmasi ${data.name} dapat arisan kali ini?`,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Konfirmasi'
      })

      if (isConfirmed) {
        dataSource.setSelected(data.id as string)

        Swal.fire({
          icon: 'success',
          title: `Selamat!`,
          text: `${data.name}, kena arisan`,
          showConfirmButton: true
        })
        notSelectedData.value = dataSource.getNonSelected()
        timer = new Timer(5000, notSelectedData.value, pickedData)
      }
      pickedData.value = {
        name: '--------'
      }
    }
  }

  onUnmounted(() => {
    timer.stopRandomPick()
  })
</script>

<template>
  <div class="flex gap-4 flex-col justify-center p-6 items-center mt-6 h-[50vh]">
    <p class="text-lg">Tekan tombol merah di bawah untuk mengocok nama</p>
    <p class="font-[courier] font-bold text-3xl md:text-6xl">{{ pickedData?.name }}</p>
    <button
      @click="randomizeName"
      class="bg-rose-500 hover:bg-rose-600 transition-all active:bg-rose-700 text-white p-4 rounded-full">
      Kocok 🎲
    </button>
  </div>
</template>
