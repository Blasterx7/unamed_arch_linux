<script setup lang="ts">
const codeStore = useCodeStore()
</script>

<template>
    <div v-html="codeStore.codeTest">
    </div>
</template>