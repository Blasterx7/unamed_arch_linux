import { defineStore } from 'pinia'
import { createStdout } from "vue-command";

export const useTerminalStore = defineStore('terminal', () => {
    const prompt = ref('ashborn@master_$ ')
    const commands = ref({
        "ls": () => createStdout("Home, Documents, Downloads, Pictures, Videos, Trash"),
        "help": {
            description: 'Liste des commandes disponibles',
            usage: 'help',
            fn: (...args: any[]) => {
                console.log('Commande appelée avec arguments :', args);
                return 'Commandes disponibles : help, echo';
            },
        },
        echo: {
            description: 'Répète ce que vous tapez',
            usage: 'echo [message]',
            fn: (...args: any[]) => args.join(' '),
        },
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