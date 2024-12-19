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

onMounted(() => {
    updateTime()
    setInterval(() => {
        updateTime()
    }, 1000)
})
</script>

<template>
    <div class="flex justify-between font-bold w-1/4 px-3 bg-secondary-100 text-lg rounded-lg">
        <div class="my-auto p-2 select-none text-sm" v-ripple>
            {{ timer.hour }} | {{ timer.date }}
        </div>
        <div class="my-auto p-2 rounded-lg" v-ripple>
            <UtilsIcon />
        </div>
        <div @click="notif_dialog = !notif_dialog" class="my-auto rounded-full select-none" v-ripple>
            <div class="absolute text-sm text-secondary-100 mx-2 my-1.5">
                52
            </div>
            <NotifAvatarIcon />
        </div>
    </div>
</template>