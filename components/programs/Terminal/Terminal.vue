<script setup lang="ts">
import VueCommand from "vue-command";
import "@/assets/styles/command.css";

const termStore = useTerminalStore()
</script>

<template>
    <div class="text-white h-full">
        <vue-command hide-bar :commands="termStore.commands">
            <template #prompt>
                {{  termStore.prompt  }}
            </template>
        </vue-command>
    </div>
</template>