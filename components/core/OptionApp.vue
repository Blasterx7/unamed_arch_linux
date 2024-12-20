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
    <v-card v-if="appStore.showOptions && process" width="300px" class="rounded-lg bg-secondary-100">
        <div class="flex space-x-4 items-center py-4 overflow-auto">
            <div v-for="item in app?.pro" :key="item.id" class="backdrop-blur-lg w-24 h-16 select-none flex flex-col items-center" @click="uptimize(item.id)">
                <v-icon>{{ item.icon }}</v-icon>
                <span>{{ item.name }}</span>
            </div>
        </div>
    </v-card>
</template>