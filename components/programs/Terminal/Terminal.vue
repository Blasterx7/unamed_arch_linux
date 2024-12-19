<script setup lang="ts">
import VueCommand from "vue-command";
import "@/assets/styles/command.css";

const termStore = useTerminalStore()
</script>

<template>
    <vue-command hide-bar :commands="termStore.commands">
        <template #prompt>
            {{  termStore.prompt  }}
        </template>
    </vue-command>
</template>