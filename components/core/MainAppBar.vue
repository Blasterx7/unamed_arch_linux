<script setup lang="ts">
import type { ITe } from '~/shared/models';


const appStore = useAppStore()
const procesStore = useProcessStore()
function toogleModal() {
    appStore.superMenu = !appStore.superMenu
}

function showOption(option: ITe) {
    procesStore.acParsedAppInArray = option
    appStore.showOptions = !appStore.showOptions
}
</script>

<template>
    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 h-16 px-4 py-2 flex items-center space-x-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 hover:bg-white/20 z-50">
        <div v-ripple class="p-2 rounded-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110 hover:bg-white/10 active:scale-95"
             @click="toogleModal()">
            <SuperIcon class="w-8 h-8 text-white drop-shadow-md" />
        </div>
        
        <div class="h-8 w-[1px] bg-white/20 mx-2"></div>

        <div class="flex items-center space-x-2 h-full">
            <div v-for="ite in procesStore.parsedAppInArray" 
                 :key="ite.name"
                 v-ripple
                 class="relative group p-2 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-110 active:scale-95 cursor-pointer"
                 @click="showOption(ite)">
                
                <v-icon size="28" class="text-white drop-shadow-sm filter group-hover:drop-shadow-lg transition-all">
                    {{ ite.pro[0].icon }}
                </v-icon>
                
                <!-- Dot indicator for active app -->
                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-70"></div>
                
                <!-- Badge -->
                 <div v-if="ite.number > 1" class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                    {{ ite.number }}
                 </div>
            </div>
        </div>
    </div>
</template>