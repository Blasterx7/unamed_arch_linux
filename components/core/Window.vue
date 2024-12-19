<script setup lang="ts">
import '~/assets/styles/drag.css';
import VueDraggableResizable from 'vue-draggable-resizable'
import type { IProcess } from '~/shared/models';
// import { TStatus } from '~/shared/types';
// const show = ref(true)
const { toogleOnFocus } = useApplication()
const size = ref({
    width: 1000,
    height: 500
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
        size.value.width = 1000
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
    <VueDraggableResizable @dblclick="toogleOnFocus(process.id)" :w="size.width" :h="size.height"
    :parent="true">
        <v-card height="100%" width="100%" color="black">
            <div class="overflow-auto select-none">
                <div class="flex justify-between py-2 px-4 col-span-2">
                    <div class="flex space-x-4">
                        <div @click="proStore.removeProcess(process.id)"
                            class="rounded-full bg-red-500 transition-colors ease-in-out duration-300 hover:bg-red-700 h-4 w-4">
                        </div>
                        <div @click="reduce()"
                            class="rounded-full bg-yellow-500 transition-colors ease-in-out duration-300 hover:bg-yellow-700 h-4 w-4">
                        </div>
                        <div
                            @click="toogleSize()"
                            class="rounded-full bg-green-500 transition-colors ease-in-out duration-300 hover:bg-green-700 h-4 w-4">
                        </div>
                    </div>
                    <div class="font-bold mr-4">
                        {{ process.name }}
                    </div>
                </div>
            </div>
            <Component class="h-full overflow-auto select-none" :is="process.program.components" />
        </v-card>
    </VueDraggableResizable>
</template>