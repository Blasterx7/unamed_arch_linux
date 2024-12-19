<script setup lang="ts">
const appStore = useAppStore()

onMounted(() => {
  setInterval(() => {
    appStore.appSize.height = window.innerHeight
    appStore.appSize.width = window.innerWidth
  }, 1000);
})
</script>

<template>
  <div>
    <div class="hidden xl:block">
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <div class="xl:hidden text-2xl font-bold px-4 text-center h-screen flex flex-col justify-center items-center">
      Cette application n'est pas disponible sur mobile. Veuillez l'ouvrir sur un ordinateur.
      (This application is not available on mobile. Please open it on a computer.)
    </div>
  </div>
</template>
