<script setup lang="ts">
import type { ITe } from '~/shared/models';


const appStore = useAppStore()
const procesStore = useProcessStore()
function toogleModal() {
    appStore.superMenu = !appStore.superMenu
}

function showOption(option: ITe) {
    procesStore.acParsedAppInArray = option
    appStore.showOptions = !appStore.showOptions
}
</script>

<template>
    <div class="w-1/4 flex px-3 py-2 space-x-3  bg-secondary-100 rounded-md">
        <div class="p-2 rounded-lg flex h-max my-auto" v-ripple>
            <SuperIcon @click="toogleModal()" />
        </div>
        <div class="space-x-3 flex h-full overflow-auto items-center">
            <v-btn class="my-auto" @click="showOption(ite)" color="purple" variant="text" v-for="ite in procesStore.parsedAppInArray" :key="ite.name">
                <v-icon>
                    {{ ite.pro[0].icon }}
                </v-icon>
                <v-badge color="transparent" overlap="circle" floating text-color="black" :content="ite.number">
                </v-badge>
            </v-btn>
        </div>
    </div>
</template>