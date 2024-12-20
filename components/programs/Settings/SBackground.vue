<script setup lang="ts">
const setStore = useSetStore()

const imgs = ref([
    {
        src: new URL('~/assets/background/arch.png', import.meta.url).href,
        text: 'Arch main theme'
    },
    {
        src: new URL('~/assets/background/boot.jpg', import.meta.url).href,
        text: 'Kali linux modified'
    },
    {
        src: new URL('~/assets/background/square.png', import.meta.url).href,
        text: 'Arch Square variant'
    },
    {
        src: new URL('~/assets/background/dance.jpg', import.meta.url).href,
        text: 'Dancing in the museum'
    },
    {
        src: new URL('~/assets/background/flat.jpeg', import.meta.url).href,
        text: 'Kali linux remasterized'
    },
    {
        src: new URL('~/assets/background/hacker.jpg', import.meta.url).href,
        text: 'Hacker Girl'
    },
    {
        src: new URL('~/assets/background/kali.jpeg', import.meta.url).href,
        text: 'Kali linux'
    },
    {
        src: new URL('~/assets/background/servers.jpg', import.meta.url).href,
        text: 'Server room'
    },
    {
        src: new URL('~/assets/background/slash.png', import.meta.url).href,
        text: 'Kali linux remasterized'
    },
    {
        src: new URL('~/assets/background/sudo.jpg', import.meta.url).href,
        text: 'Sudo prompt'
    },
    {
        src: new URL('~/assets/background/vbanner.jpg', import.meta.url).href,
        text: 'Vuetify banner'
    },
    {
        src: new URL('~/assets/background/windows.jpg', import.meta.url).href,
        text: 'Windows'
    },
])

function changeImg(bg: { src: string, text: string }) {
    setStore.setActiveBg(bg)
}
</script>

<template>
    <div class="grid grid-cols-3 gap-4 p-4 w-full">
        <v-card height="300" v-for="img in imgs" @click="changeImg(img)" :key="img.text" class="rounded-lg" width="100%"
            color="transparent">
            <v-img height="250" :src="img.src" cover></v-img>
            <v-card-text>
                <div class="flex justify-between">
                    <div class="text-center">{{ img.text }}</div>
                    <v-icon color="purple">{{ setStore.activeBg.src === img.src ? 'mdi-check' : '' }}</v-icon>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>