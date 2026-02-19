<script setup lang="ts">
import type { ITe } from '~/shared/models';

const props = defineProps({
    process: {
        type: Object as () => ITe,
        required: true
    }
})

const appStore = useAppStore()
const procesStore = useProcessStore()

const app = computed(() => {
    return procesStore.parsedAppInArray.find((item) => item.name === props.process.name)
})

function uptimize(id: string)
{
    procesStore.setStatutNormal(id)
}
</script>
<template>
    <v-card v-if="appStore.showOptions && process" class="rounded-lg bg-[#1a1b26] border border-white/10 w-[220px]">
        <div class="flex space-x-2 items-center py-2 px-2 overflow-x-auto custom-scrollbar">
            <div v-for="item in app?.pro" :key="item.id" class="w-16 h-14 select-none flex flex-col items-center justify-center rounded hover:bg-white/5 cursor-pointer text-white/80 hover:text-white transition-colors" @click="uptimize(item.id)">
                <v-icon>{{ item.icon }}</v-icon>
                <span>{{ item.name }}</span>
            </div>
        </div>
    </v-card>
</template>