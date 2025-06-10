import { defineStore } from 'pinia'
import type { IProgram, IProcess } from '~/shared/models' // Added IProcess

// Define IGroupedProcess interface
interface IGroupedProcess { name: string; number: number; pro: IProcess[]; }

export const useAppStore = defineStore('app', () => {
    const superMenu = shallowRef(false)
    const notifMenu = shallowRef(false)
    const selectedAppGroup = shallowRef<IGroupedProcess | null>(null); // Added new state
    const search = ref('')
    const isRestarted = ref(false)
    const appSize = ref({
        height: 800,
        width: 500
    })
    const poweroff_pro = ref({
        message: "Ashborn arc is powering of",
        isPoweringOff: false,
    })
    const showOptions = ref(false)
    const applications: Ref<IProgram[]> = shallowRef<IProgram[]>([
        {
            name: 'Explorer',
            icon: 'mdi-folder',
            components: 'Explorer',
        },
        {
            name: 'Terminal',
            icon: 'mdi-console',
            components: 'Terminal',
        },
        {
            name: 'Task manager',
            icon: 'mdi-turbine',
            components: 'TaskManager',
        },
        {
            name: 'App editor',
            icon: 'mdi-code-braces',
            components: 'DCode',
        },
        {
            name: 'Settings',
            icon: 'mdi-cog',
            components: 'Settings',
        }
    ])
    
    const applis = computed(() => {
        return applications.value?.filter((app) => {
            return app.name.toLowerCase().includes(search.value)
        })
    })

    function toggleAppGroupOptions(group: IGroupedProcess) {
        if (selectedAppGroup.value?.name === group.name && showOptions.value) {
            selectedAppGroup.value = null;
            showOptions.value = false; // Hide options when deselecting or toggling off
        } else {
            selectedAppGroup.value = group;
            showOptions.value = true;  // Show options when selecting a new group
        }
    }

    return {
        isRestarted,
        poweroff_pro,
        superMenu,
        notifMenu,
        applications,
        search,
        applis,
        showOptions,
        appSize,
        selectedAppGroup, // Exposed new state
        toggleAppGroupOptions, // Exposed new action
    }
})