<script setup lang="ts">
import * as Vue from 'vue'
import { loadModule } from 'vue3-sfc-loader'

const props = defineProps({
  code: {
    type: String, // Le code Vue brut (SFC)
    required: true
  }
})

const error = ref<string | null>(null)
const dynamicComponent = shallowRef<any>(null)

const options = {
  moduleCache: {
    vue: Vue
  },
  async getFile(url: string) {
    if (url === '/component.vue') return props.code
    return Promise.reject(new Error('File not found'))
  },
  addStyle(textContent: string) {
    const style = document.createElement('style')
    style.textContent = textContent
    const ref = document.head.getElementsByTagName('style')[0] || null
    document.head.insertBefore(style, ref)
  },
}

const compile = async () => {
    error.value = null
    try {
        dynamicComponent.value = await loadModule('/component.vue', options)
    } catch (e: any) {
        error.value = e.message
        console.error("Compilation Error:", e)
    }
}

watch(() => props.code, compile, { immediate: true })

</script>

<template>
  <div class="h-full w-full bg-white relative">
     <div v-if="error" class="absolute inset-0 bg-red-100 text-red-800 p-4 z-50 overflow-auto whitespace-pre-wrap">
         Compilation Error:
         {{ error }}
     </div>
     <Suspense>
         <component :is="dynamicComponent" v-if="dynamicComponent" />
         <template #fallback>
             <div class="flex items-center justify-center h-full">Compiling...</div>
         </template>
     </Suspense>
  </div>
</template>
