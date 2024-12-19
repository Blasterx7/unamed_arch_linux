<script setup lang="ts">
const router = useRouter()
const appStore = useAppStore()

if (appStore.isRestarted) {
    router.push('session')
}
function poweron() {
    router.push('session')
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