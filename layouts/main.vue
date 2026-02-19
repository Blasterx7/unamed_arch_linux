<script setup lang="ts">
const setStore = useSetStore()
</script>

<template>
    <v-img cover height="100vh" width="100%" :src="setStore.activeBg.src">
        <div id="base" class="h-screen relative text-black flex flex-col w-full">
        <AppScreen />
        <MainAppBar />
        <CenterBar />
        <DateHour />
    </div>
    </v-img>
</template>
<!-- 
<style scoped>
#base {
    font-family: 'Montserrat', sans-serif;
    background: url('~/assets/background/arch.png') no-repeat;
    background-size: cover;
}
</style> -->