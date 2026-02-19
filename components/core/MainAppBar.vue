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
    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 h-10 px-2 py-1 flex items-center space-x-2 bg-[#1a1b26] border border-white/10 rounded-lg shadow-2xl z-50">
        <div v-ripple class="p-1 rounded-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110 hover:bg-white/10 active:scale-95"
             @click="toogleModal()">
             <!-- Reduced SuperIcon size slightly or rely on component sizing if internal -->
            <SuperIcon class="w-5 h-5 text-white drop-shadow-md" />
        </div>
        
        <div class="h-4 w-[1px] bg-white/10 mx-0.5"></div>

        <div class="flex items-center space-x-1 h-full">
            <div v-for="ite in procesStore.parsedAppInArray" 
                 :key="ite.name"
                 v-ripple
                 class="relative group p-1.5 rounded-md transition-all duration-300 hover:bg-white/10 hover:scale-110 active:scale-95 cursor-pointer"
                 @click="showOption(ite)">
                
                <v-icon size="18" class="text-white drop-shadow-sm filter group-hover:drop-shadow-lg transition-all">
                    {{ ite.pro[0].icon }}
                </v-icon>
                
                <!-- Dot indicator for active app -->
                <div class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-white rounded-full opacity-70"></div>
                
                <!-- Badge -->
                 <div v-if="ite.number > 1" class="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded-full shadow-sm">
                    {{ ite.number }}
                 </div>
            </div>
        </div>
    </div>
</template>