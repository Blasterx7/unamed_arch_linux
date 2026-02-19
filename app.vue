<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const appStore = useAppStore()
const circularModel = ref(20)

const updateSize = () => {
  appStore.appSize.height = window.innerHeight
  appStore.appSize.width = window.innerWidth
}

onMounted(() => {
  updateSize() // Initial size
  useEventListener(window, 'resize', updateSize)
})
</script>

<template>
  <div class="text-white text-sm">
    <div v-if="appStore.poweroff_pro.isPoweringOff" class="absolute z-20 flex flex-col justify-center items-center text-4xl font-bold bg-black h-full w-full">
      <div class="mb-10">
        {{ appStore.poweroff_pro.message }}
      </div>
      <v-progress-circular
        v-model="circularModel"
        indeterminate
      />
    </div>
    <div class="hidden lg:block">
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <div class="lg:hidden text-2xl font-bold px-4 text-center h-screen flex flex-col justify-center items-center">
      Cette application n'est pas disponible sur mobile. Veuillez l'ouvrir sur un ordinateur.
      (This application is not available on mobile. Please open it on a computer.)
    </div>
  </div>
</template>
