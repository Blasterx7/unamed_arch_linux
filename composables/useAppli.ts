import { TStatus } from "~/shared/types";
import { v4 as uuidv4 } from 'uuid';

export const useApplication = () => {
    const proStore = useProcessStore()
    const appStore = useAppStore()

    function launchApp(app: any) {
        appStore.superMenu = !appStore.superMenu
        if (proStore.currentProcess !== null) {
            proStore.addProcess(proStore.currentProcess)
    
            proStore.setCurrentProcess({
                id: app.name.toLowerCase() + '-' + uuidv4(),
                name: app.name,
                description: app.name ?? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error dicta veniam facilis esse porro sed iusto nisi cumque repudiandae. Neque provident facere exercitationem id nobis? Fugiat ab quo perspiciatis? Minima.',
                key: 0,
                status: TStatus.NORM,
                icon: app.icon,
                program: {
                    id: app.name.toLowerCase() + 'program',
                    name: app.name,
                    components: app.components
                },
                created: new Date().toISOString(),
                updated: new Date().toISOString()
            })
    
        } else {
            proStore.setCurrentProcess({
                id: app.name.toLowerCase() + '-' + uuidv4(),
                name: app.name,
                description: app.name ?? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error dicta veniam facilis esse porro sed iusto nisi cumque repudiandae. Neque provident facere exercitationem id nobis? Fugiat ab quo perspiciatis? Minima.',
                key: 0,
                status: TStatus.NORM,
                icon: app.icon,
                program: {
                    id: app.name.toLowerCase() + "_" + 'program',
                    name: app.name,
                    components: app.components
                },
                created: new Date().toISOString(),
                updated: new Date().toISOString()
            })
        }
    }

    function toogleOnFocus(id: string) {
        const current = proStore.processes.findIndex((process) => process.id === id)
        const currentProcess = proStore.currentProcess
        proStore.processes.forEach((process, index) => {
            process.key = index
            if (process.id === id) {
                proStore.processes[current] = currentProcess ?? process
                proStore.setCurrentProcess(process)
            }
        })
    }

    return {
        toogleOnFocus,
        launchApp
    }
}