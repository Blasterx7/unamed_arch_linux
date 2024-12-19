<template>
    <v-img cover height="100vh" width="100%" src="~/assets/background/arch.png">
        <div id="base" class="h-screen relative text-black flex flex-col w-full">
        <AppScreen />
        <footer class="flex justify-between space-x-4 w-full pb-4 px-4">
            <MainAppBar />
            <CenterBar />
            <DateHour />
        </footer>
    </div>
    </v-img>
</template>

<style scoped>
#base {
    font-family: 'Montserrat', sans-serif;
    background: url('~/assets/background/arch.png') no-repeat;
    background-size: cover;
}
</style>