<script setup lang="ts">
// import type { ITe } from '~/shared/models'; // ITe might be replaced by IGroupedProcess structure
import { useAppStore } from '~/stores/app.store';
import { useProcessStore } from '~/stores/process.store';
import type { IProcess } from '~/shared/models'; // For IGroupedProcess structural typing

// Define IGroupedProcess structure for clarity, assuming it's not globally available yet
interface IGroupedProcess { name: string; number: number; pro: IProcess[]; }

const appStore = useAppStore();
const procesStore = useProcessStore(); // procesStore is used in template

function toogleModal() {
    appStore.superMenu = !appStore.superMenu;
}

// Updated showOption function
function showOption(option: IGroupedProcess) { // Using IGroupedProcess structure
    appStore.toggleAppGroupOptions(option); // No need for `as any` if option matches IGroupedProcess
    // The line `procesStore.acParsedAppInArray = option` is removed.
    // The logic for appStore.showOptions is now handled within toggleAppGroupOptions.
}
</script>

<template>
    <div class="w-1/4 flex px-3 py-2 space-x-3  bg-secondary-100 rounded-md">
        <div v-ripple class="p-2 rounded-lg flex h-max my-auto">
            <SuperIcon @click="toogleModal()" />
        </div>
        <div class="space-x-3 flex h-full overflow-auto items-center">
            <v-btn v-for="ite in procesStore.parsedAppInArray" :key="ite.name" class="my-auto" color="purple" variant="text" @click="showOption(ite as IGroupedProcess)">
                <v-icon>
                    {{ ite.pro[0].icon }}
                </v-icon>
                <v-badge color="transparent" overlap="circle" floating text-color="black" :content="ite.number"/>
            </v-btn>
        </div>
    </div>
</template>