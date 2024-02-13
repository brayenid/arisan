<script lang="ts" setup>
  import { DataSource } from '@/utils/Data'
  import { ref, onUnmounted } from 'vue'
  import { emitter } from '@/utils/EventBus'
  import { generateId } from '@/utils/IDGenerator'
  import Swal from 'sweetalert2'

  const dataSource = new DataSource('members')

  const memberName = ref<string>('')

  const addNewMember = (): void => {
    dataSource.setData({
      id: generateId(),
      name: memberName.value,
      selected: false
    })

    memberName.value = ''
    emitter.emit('update-member')
  }

  const resetSelected = async (): Promise<void> => {
    const { isConfirmed } = await Swal.fire({
      title: 'Yakin Melakukan Reset?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Batal',
      confirmButtonText: 'Reset'
    })

    if (isConfirmed) {
      dataSource.resetSelected()
      Swal.fire({
        title: 'Berhasil Melakukan Reset',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Reset'
      })
      emitter.emit('update-member')
    }
  }

  onUnmounted(() => {
    emitter.all.clear()
  })
</script>

<style lang="postcss" scoped>
  input[type='text'] {
    @apply p-2 border-4 border-transparent rounded-lg text-center focus:outline-none focus:border-blue-200;
  }

  button {
    @apply bg-blue-400 rounded-lg p-2 border-4 border-transparent hover:bg-blue-500 active:bg-blue-600 transition-all text-white font-bold focus:outline-none focus:border-blue-200 active:outline-none;
  }
</style>

<template>
  <form class="flex flex-col gap-4 w-full max-w-96 justify-center mx-auto mt-6" @submit.prevent="addNewMember">
    <input type="text" required name="name" v-model="memberName" placeholder="Masukan nama anggota" />
    <div class="flex gap-2">
      <button type="submit" class="flex-[1]">Tambah Anggota</button>
      <button type="button" v-if="dataSource.getData().length > 0" class="flex-[1]" @click="resetSelected">
        Reset Keterpilihan
      </button>
    </div>
  </form>
</template>
