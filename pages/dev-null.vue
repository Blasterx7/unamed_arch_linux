<script setup lang="ts">
const router = useRouter()
const appStore = useAppStore()

setTimeout(() => {
    if (appStore.isRestarted) {
        router.push('session')
    }
}, 3000);
function poweron() {
    appStore.poweroff_pro.message = "Ashborn arc is powering on"
    appStore.poweroff_pro.isPoweringOff = true
    setTimeout(() => {
        appStore.poweroff_pro.isPoweringOff = false
        router.push('session')
    }, 2000);
}
</script>

<template>
    <div class="bg-black h-full flex flex-col items-center justify-center">
        <div>
            <div class="my-2 text-4xl">
                System offline : Power on ?
            </div>
            <v-btn @click="poweron()" size="large" class="my-2 w-full" variant="text">
                <v-icon size="large">
                    mdi-power
                </v-icon>
            </v-btn>
        </div>
    </div>
</template>