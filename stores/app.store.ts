import { defineStore } from 'pinia'
import type { IProgram } from '~/shared/models'


export const useAppStore = defineStore('app', () => {
    const superMenu = shallowRef(false)
    const notifMenu = shallowRef(false)
    const search = ref('')
    const appSize = ref({
        height: 800,
        width: 500
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

    return {
        superMenu,
        notifMenu,
        applications,
        search,
        applis,
        showOptions,
        appSize,
    }
})