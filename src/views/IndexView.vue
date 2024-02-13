<script lang="ts" setup>
  import Nav from '@/components/Nav.vue'
</script>

<template>
  <div class="container">
    <h1 class="bg-blue-200 rounded-es-full rounded-ee-full text-4xl font-extrabold p-4 text-center font-silkscreen">
      Arisan
    </h1>
    <Nav />
    <RouterView />
  </div>
</template>
