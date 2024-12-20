<script setup lang="ts">

const router = useRouter()
const appStore = useAppStore()

const poweropt = ref([
    {
        name: "Suspend",
        action: () => {
            router.push('/session')
        }
    },
    {
        name: "Restart",
        action: () => {
            appStore.poweroff_pro.isPoweringOff = true
            setTimeout(() => {
                appStore.isRestarted = true
                appStore.poweroff_pro.isPoweringOff = false
                router.push('/dev-null')
            }, 2000);
        }
    },
    {
        name: "Poweroff",
        action: () => {
            appStore.poweroff_pro.isPoweringOff = true
            setTimeout(() => {
                router.push("/dev-null")
                appStore.poweroff_pro.isPoweringOff = false
            }, 2000);
        }
    }
])
</script>

<template>
    <v-menu location="end">
        <template v-slot:activator="{ props }">
            <v-btn variant="plain" icon="mdi-power" v-bind="props">

            </v-btn>
        </template>

        <v-list>
            <v-list-item @click="item.action" v-for="(item, index) in poweropt" :key="index">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>