<template>
  <div class="text-center flex flex-col gap-4 h-[50vh] items-center justify-center p-6">
    <h2 class="text-3xl font-extrabold">Selamat Datang di Arisan</h2>
    <p class="text-lg">Web ini membantu pengocokan nama arisan dengan cara asyik 👍👍. Mulai arisan?</p>
    <div class="flex justify-center gap-3">
      <RouterLink to="/members" class="bg-red-400 p-3 text-white hover:bg-red-500 rounded-lg font-bold transition-all"
        >Atur Anggota 😎</RouterLink
      >
      <RouterLink to="/shuffle" class="bg-blue-400 p-3 text-white hover:bg-blue-500 rounded-lg font-bold transition-all"
        >Kocok Arisan 🎲</RouterLink
      >
    </div>
  </div>
</template>
