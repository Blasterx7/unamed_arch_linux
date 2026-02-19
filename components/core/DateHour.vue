<script setup lang="ts">
const notif_dialog = ref(false)
const timer = ref({
    date: "",
    hour: "",
})

const updateTime = () => {
    const date = new Date()
    timer.value.date = date.toLocaleDateString()
    timer.value.hour = date.toLocaleTimeString()
}

const hour = computed(() => {
    // kee onlny hour in format 00:00
    return timer.value.hour.split(" ")[0].split(":").slice(0, 2).join(":")
})

const date = computed(() => {
    return timer.value.date.split("-").slice(0, 2).join("/")
})

onMounted(() => {
    updateTime()
    setInterval(() => {
        updateTime()
    }, 1000)
})
</script>

<template>
    <div class="fixed bottom-4 right-4 h-12 px-4 flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-lg text-white font-medium z-40 transition-all hover:bg-white/20">
        <div v-ripple class="cursor-default select-none text-sm tracking-wide">
            {{ hour }} <span class="mx-1 opacity-50">|</span> {{ date }}
        </div>
        
        <div class="h-4 w-[1px] bg-white/20"></div>

        <div v-ripple class="p-1.5 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
            <UtilsIcon class="w-4 h-4" />
        </div>
        
        <div v-ripple class="relative p-1.5 rounded-full hover:bg-white/10 cursor-pointer transition-colors" @click="notif_dialog = !notif_dialog">
             <div v-if="true" class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-black/20"></div>
            <NotifAvatarIcon class="w-4 h-4" />
        </div>
    </div>
</template>