<script setup lang="ts">
const proStore = useProcessStore()
</script>

<template>
    <div class="w-1/2 bg-secondary-100 bg-opacity-45 justify-center text-sm flex rounded-lg">
        <div class="my-auto">
            {{ proStore.currentProcess?.status }}
            Ashborn Arc, v0.0.3.1 | Limited.
        </div>
    </div>
</template>