import { defineStore } from 'pinia'
import { createStdout } from "vue-command";

export const useTerminalStore = defineStore('terminal', () => {
    const prompt = ref('ashborn@master_$ ')
    const commands = ref({
        "ls": () => createStdout("Home, Documents, Downloads, Pictures, Videos, Trash"),
        "cmd-list": () => createStdout(listCmd.value),
        "git": () => createStdout("Git is not installed"),
    })

    const listCmd = computed(() => {
        return Object.keys(commands.value)
    })

    return {
        prompt,
        commands,
    }
})