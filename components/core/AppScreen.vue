<script setup lang="ts">
import { TStatus } from '~/shared/types';
import { useProcessStore } from '~/stores/process.store';
import { useAppStore } from '~/stores/app.store';

const proStore = useProcessStore();
const appStore = useAppStore();
// const error = { // Removed as proStore.acParsedAppInArray is removed and OptionApp now uses selectedAppGroup
//     name: '',
//     pro: [],
//     number: 0
// }
</script>

<template>
    <NuxtLayout name="screen">
        <template v-for="process in proStore.processes" :key="process.id">
            <Window v-if="process.status !== TStatus.MIN" :process="process" />
        </template>
        <Window
v-if="proStore.currentProcess && proStore.currentProcess.status !== TStatus.MIN"
            :process="proStore.currentProcess" />
        <MenuDial v-click-outside="appStore.superMenu = false" />
        <div class="absolute bottom-20 left-2 p-2">
            <OptionApp :processGroup="appStore.selectedAppGroup" />
        </div>
    </NuxtLayout>
</template>