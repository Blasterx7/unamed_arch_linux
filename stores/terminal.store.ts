import { defineStore } from 'pinia'
import { createStdout } from "vue-command";

export const useTerminalStore = defineStore('terminal', () => {
    const prompt = ref('ashborn@master_$ ')

    const commands = ref({
        "hello-world": () => createStdout("Hello world"),
        "ls": () => createStdout("Home, Documents, Downloads, Pictures, Videos, Trash"),
    })

    return {
        prompt,
        commands,
    }
})