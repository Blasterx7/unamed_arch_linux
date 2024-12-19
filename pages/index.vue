<script setup lang="ts">
const appStore = useAppStore()

if (appStore.isRestarted)
{
    appStore.isRestarted = false
}
</script>

<template>
    <NuxtLayout>
        <Disclaimer />
    </NuxtLayout>
</template>