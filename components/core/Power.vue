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
            appStore.isRestarted = true
            router.push('/dev-null')
        }
    },
    {
        name: "Poweroff",
        action: () => {
            alert("Poweroff the app")
            router.push("/dev-null")
        }
    }
])
</script>

<template>
    <v-menu location="end">
        <template v-slot:activator="{ props }">
            <v-btn icon="mdi-power" v-bind="props">

            </v-btn>
        </template>

        <v-list>
            <v-list-item @click="item.action" v-for="(item, index) in poweropt" :key="index">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>