<script setup lang="ts">
const tabs = ref([
    {
        name: 'Background',
        icon: 'mdi-wallpaper',
        component: 'SBackground',
    },
    {
        name: 'About',
        icon: 'mdi-information',
        component: 'SAbout'
    },
])

const currentTab = ref('SBackground')

function setWindow(tab: string)
{
    currentTab.value = tab
}
</script>
<template>
    <div class="flex w-full text-white">
        <div class="w-1/3 px-2 space-y-4 py-4">
            <v-list class="bg-transparent">
                <v-list-item v-for="tab in tabs" :key="tab.name" :prepend-icon="tab.icon" class="text-left w-full" variant="text" @click="setWindow(tab.component)">
                    {{ tab.name }}
                </v-list-item>
            </v-list>
        </div>
        <component :is="currentTab" class="h-full overflow-auto select-none" />
    </div>
</template>