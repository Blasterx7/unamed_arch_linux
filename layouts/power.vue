<script setup lang="ts">
const progress = ref(50)
const router = useRouter()
onMounted(() => {
    setTimeout(() => {
        progress.value = 100
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }, 2000)
})
</script>

<template>
    <div id="base" class="h-screen relative justify-center items-center text-black flex flex-col w-full bg-black">
        <div>
            <h1 class="text-4xl mb-10 font-bold text-white">Powering off...</h1>
        </div>
        <v-progress-circular
          :indeterminate="true"
          size="64"
          v-model="progress"
        ></v-progress-circular>
    </div>
</template>

<style scoped>
#base {
    font-family: 'Montserrat', sans-serif;
    background: url('~/assets/background/arch.png') no-repeat;
    background-size: cover;
}
</style>