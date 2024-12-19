<script setup lang="ts">

const router = useRouter()

const poweropt = ref([
    {
        name: "Suspend",
        action: () => {
            alert("Supended the app")
        }
    },
    {
        name: "Restart",
        action: () => {
            alert("Restarted the app")
        }
    },
    {
        name: "Poweroff",
        action: () => {
            alert("Poweroff the app")
            router.push("/")
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