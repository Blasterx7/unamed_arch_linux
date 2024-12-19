<template>
    <div id="base" class="h-screen relative text-black flex flex-col w-full bg-black">
        <slot></slot>
    </div>
</template>

<style scoped>
#base {
    font-family: 'Montserrat', sans-serif;
    background: url('~/assets/background/arch.png') no-repeat;
    background-size: cover;
}
</style>