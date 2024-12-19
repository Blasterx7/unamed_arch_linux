<script setup lang="ts">
const router = useRouter()

const options = ref({
    items: [
        { title: 'New Game', icon: 'mdi-gamepad-variant', action: () => router.push('/main') },
        { title: 'Profile', icon: 'mdi-account', action: go },
        { title: 'Settings', icon: 'mdi-cog', action: go },
        { title: 'About', icon: 'mdi-information', action: go }
    ]
})

function go() {
    // unused function
}

useHead
    ({
        title: "Main Menu"
    })
</script>

<template>
    <div id="screen" class="h-screen w-full flex flex-col justify-end">
        <v-card width="520" color="transparent" class="backdrop-blur-3xl mb-96 ml-56 text-white">
            <v-card-text>
                <div class="flex flex-col">
                    <v-list class="bg-transparent">
                        <v-list-item @click="item.action" class="bg-transparent" :append-icon="item.icon"
                            v-for="item in options.items" :key="item.title">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>


<style scoped>
#screen {
    background: url('~/assets/background/boot.jpg');
    background-size: cover;
}
</style>