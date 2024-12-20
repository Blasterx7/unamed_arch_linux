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
    <div class="flex justify-between font-bold w-1/4 px-3 bg-secondary-100 text-lg rounded-lg">
        <div v-ripple class="my-auto p-2 select-none text-sm">
            {{ hour }} | {{ date }}
        </div>
        <div v-ripple class="my-auto p-2 rounded-lg">
            <UtilsIcon />
        </div>
        <div v-ripple class="my-auto rounded-full select-none" @click="notif_dialog = !notif_dialog">
            <div class="absolute text-sm text-secondary-100 mx-2 my-1.5">
                52
            </div>
            <NotifAvatarIcon />
        </div>
    </div>
</template>