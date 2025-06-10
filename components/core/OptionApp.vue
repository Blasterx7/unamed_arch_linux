<script setup lang="ts">
import type { IProcess } from '~/shared/models'; // For IGroupedProcess
import { useAppStore } from '~/stores/app.store';
import { useProcessStore } from '~/stores/process.store';

// Define IGroupedProcess structure for clarity
interface IGroupedProcess { name: string; number: number; pro: IProcess[]; }

const props = defineProps({
    processGroup: { // Changed from process to processGroup
        type: Object as () => IGroupedProcess | null, // Updated type
        default: null // No longer required, defaults to null
    }
});

const appStore = useAppStore();
const procesStore = useProcessStore(); // Retained for uptimize function

// Updated computed property to directly use processGroup
const app = computed(() => props.processGroup);

function uptimize(id: string) { // Renamed from uptimize for consistency if desired, but keeping as is.
    procesStore.setStatutNormal(id);
}
</script>
<template>
    <v-card v-if="appStore.showOptions && props.processGroup" width="300px" class="rounded-lg bg-secondary-100">
        <div class="flex space-x-4 items-center py-4 overflow-auto">
            <div v-for="item in app?.pro" :key="item.id" class="backdrop-blur-lg w-24 h-16 select-none flex flex-col items-center" @click="uptimize(item.id)">
                <v-icon>{{ item.icon }}</v-icon>
                <span>{{ item.name }}</span>
            </div>
        </div>
    </v-card>
</template>