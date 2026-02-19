<script setup lang="ts">
const appStore = useAppStore()
const { launchApp } = useApplication()
</script>
<template>
    <div class="fixed bottom-24 left-4 w-[320px] h-[400px] bg-[#1a1b26] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
        <!-- Header -->
        <div class="p-4 border-b border-white/10">
            <div class="text-white font-bold text-lg tracking-wide">
                Applications
            </div>
            <v-text-field
                v-model="appStore.search"
                class="mt-3"
                prepend-inner-icon="mdi-magnify"
                placeholder="Rechercher..."
                variant="outlined"
                density="compact"
                hide-details
                bg-color="rgba(255,255,255,0.05)"
                theme="dark"
                rounded="lg"
            />
        </div>

        <!-- App Grid -->
        <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div class="grid grid-cols-3 gap-3">
                <div
                    v-for="app in appStore.applis" 
                    :key="app.name"
                    v-ripple
                    class="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer group space-y-2" 
                    @click="launchApp(app)"
                >
                    <v-icon :icon="app.icon" size="32" class="text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300"/>
                    <div class="text-xs text-center text-white/70 group-hover:text-white font-medium truncate w-full">
                        {{ app.name }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center">
            <Power />
            <div 
                v-ripple
                class="p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
                @click="launchApp({
                    name: 'Settings',
                    icon: 'mdi-cog',
                    components: 'Settings',
                })"
            >
                <v-icon icon="mdi-cog" color="white" />
            </div>
        </div>
    </div>
</template>