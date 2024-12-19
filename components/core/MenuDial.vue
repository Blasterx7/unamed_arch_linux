<script setup lang="ts">
const appStore = useAppStore()
const { launchApp } = useApplication()
</script>
<template>
        <v-card v-if="appStore.superMenu" class="position-absolute pa-6 bottom-24 left-4" width="600" height="600">
            <div class="font-bold text-primary-100 text-lg my-2">
                My Applications
            </div>
            <hr>
            <v-text-field class="w-full my-4" v-model="appStore.search" prepend-inner-icon="mdi-magnify" type="search"
                placeholder="Search for an application" outlined dense clearable></v-text-field>
            <div class="h-[300px] overflow-auto grid grid-cols-3 gap-4">
                <div v-for="app in appStore.applis" :key="app.name"
                    class="hover:text-primary-100 h-[100px] duration-200 ease-in-out transition-colors p-5 flex justify-center flex-col items-center select-none col-span-1"
                    v-ripple @click="launchApp(app)">
                    <v-icon :icon="app.icon"></v-icon>
                    <div>
                        {{ app.name }}
                    </div>
                </div>
            </div>
            <div class="flex justify-between mt-10">
                <Power />
                <v-avatar color="grey" @click="launchApp({
                    name: 'Settings',
                    icon: 'mdi-cog',
                    components: 'Settings',
                })"
                    image="https://images.pexels.com/photos/8638618/pexels-photo-8638618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></v-avatar>
            </div>
        </v-card>
</template>