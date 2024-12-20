<script setup lang="ts">
const tabs = ref([
    {
        name: 'Home',
        icon: 'mdi-home',
        component: 'ExHome',
    },
    {
        name: 'Documents',
        icon: 'mdi-file-document',
        component: 'ExDoc'
    },
    {
        name: 'Downloads',
        icon: 'mdi-download',
        component: 'ExDownload'
    },
    {
        name: 'Music',
        icon: 'mdi-music',
        component: 'ExMusic'
    },
    {
        name: 'Pictures',
        icon: 'mdi-image',
        component: 'ExPicture'
    },
    {
        name: 'Videos',
        icon: 'mdi-video',
        component: 'ExVideos'
    },
    {
        name: 'Trash',
        icon: 'mdi-delete',
        component: 'ExTrash'
    }
])

const currentTab = ref('ExHome')

function setWindow(tab: string)
{
    currentTab.value = tab
}
</script>
<template>
    <div class="flex w-full">
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