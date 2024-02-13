<style lang="postcss" scoped>
  a {
    @apply text-lg relative;
  }
  a::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 15px;
    max-height: 0;
    background-color: aqua;
    bottom: 0;
    opacity: 0.3;
    transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s;
  }
  a:hover::before {
    max-height: 30% !important;
  }
</style>
<template>
  <div class="flex w-full justify-center items-center gap-4 mt-5">
    <RouterLink to="/">Beranda</RouterLink>
    <span>/</span>
    <RouterLink to="/members">Anggota</RouterLink>
    <span>/</span>
    <RouterLink to="/shuffle">Kocok Arisan</RouterLink>
  </div>
</template>
