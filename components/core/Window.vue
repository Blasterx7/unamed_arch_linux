<script setup lang="ts">
import '~/assets/styles/drag.css';
import VueDraggableResizable from 'vue-draggable-resizable'
import type { IProcess } from '~/shared/models';
// import { TStatus } from '~/shared/types';
// const show = ref(true)
const { toogleOnFocus } = useApplication()
const size = ref({
    width: 700,
    height: 450
})

const changedSize = ref(false)
const proStore = useProcessStore()
const appStore = useAppStore()

const props = defineProps({
    process: {
        type: Object as () => IProcess,
        required: true
    }
})

function toogleSize() {
    if (changedSize.value) {
        size.value.width = 800
        size.value.height = 500
    } else {
        size.value.width = appStore.appSize.width
        size.value.height = appStore.appSize.height
    }
    changedSize.value = !changedSize.value
}


// onUpdated(() => {
//     alert("updated")
//     const index = proStore.processes.findIndex(p => p.id === props.process.id)
//     if (proStore.currentProcess?.id === props.process.id) {
//         if (proStore.currentProcess?.status === TStatus.MIN) {
//             show.value = false
//         } else {
//             show.value = true
//         }
//     } else if (index > 0)
//     {
//         if (proStore.processes[index].status === TStatus.MIN) {
//             show.value = false
//         } else {
//             show.value = true
//         }
//     }
// })

function reduce() {
    proStore.setStatutMin(props.process.id)
}
</script>

<template>
    <VueDraggableResizable
:w="size.width" :h="size.height" :parent="true"
    @dblclick="toogleOnFocus(process.id)">
        <div class="h-full w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a1b26] text-gray-100 flex flex-col">
            <!-- Window Header -->
            <div class="flex justify-between items-center px-4 py-3 bg-white/5 border-b border-white/10 select-none"
                 @dblclick="toogleOnFocus(process.id)">
                <!-- Controls -->
                <div class="flex space-x-2 group">
                    <button class="rounded-full bg-red-500 hover:bg-red-600 h-3 w-3 shadow-sm flex items-center justify-center transition-all duration-200"
                            @click.stop="proStore.removeProcess(process.id)">
                    </button>
                    <button class="rounded-full bg-yellow-500 hover:bg-yellow-600 h-3 w-3 shadow-sm flex items-center justify-center transition-all duration-200"
                            @click.stop="reduce()">
                    </button>
                    <button class="rounded-full bg-green-500 hover:bg-green-600 h-3 w-3 shadow-sm flex items-center justify-center transition-all duration-200"
                            @click.stop="toogleSize()">
                    </button>
                </div>
                
                <!-- Title -->
                <div class="text-white/90 text-sm font-medium tracking-wide">
                    {{ process.name }}
                </div>
                
                <!-- Spacer for balance -->
                <div class="w-14"></div>
            </div>

            <!-- Window Content -->
            <div class="flex-1 overflow-auto bg-black/40 relative">
                 <Component :is="process.program.components" class="h-full w-full" />
            </div>
        </div>
    </VueDraggableResizable>
</template>