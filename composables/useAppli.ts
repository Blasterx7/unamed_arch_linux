import { TStatus } from "~/shared/types"; // Keep existing imports
import { v4 as uuidv4 } from 'uuid'; // Keep existing imports
import { useProcessStore } from '~/stores/process.store'; // Ensure useProcessStore is imported
import { useAppStore } from '~/stores/app.store'; // Explicitly import useAppStore
import type { IProcess } from '~/shared/models'; // Ensure IProcess is imported

export const useApplication = () => {
    const proStore = useProcessStore();
    const appStore = useAppStore();

    function launchApp(app: any) {
        appStore.superMenu = !appStore.superMenu;
        if (proStore.currentProcess !== null) {
            if (!proStore.processes.value.find(p => p.id === proStore.currentProcess!.id)) {
                 proStore.addProcess(proStore.currentProcess);
            }
    
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
            } as IProcess);
    
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
            } as IProcess);
        }
    }

    function toogleOnFocus(id: string) {
        if (proStore.currentProcess?.id === id) {
            return;
        }

        let targetProcess: IProcess | null = null;
        let targetProcessOriginatesFromProcessesArray = false;

        const targetIndexInProcesses = proStore.processes.value.findIndex(p => p.id === id);

        if (targetIndexInProcesses !== -1) {
            targetProcess = proStore.processes.value[targetIndexInProcesses];
            targetProcessOriginatesFromProcessesArray = true;
        } else if (proStore.currentProcess?.id === id) {
            targetProcess = proStore.currentProcess;
        }

        if (!targetProcess) {
            console.error(`Process with id ${id} not found for focus.`);
            return;
        }

        const oldCurrentProcess = proStore.currentProcess;

        proStore.setCurrentProcess(targetProcess);

        let newProcessesArray = [...proStore.processes.value];

        if (targetProcessOriginatesFromProcessesArray) {
            newProcessesArray.splice(targetIndexInProcesses, 1);
        }

        if (oldCurrentProcess && oldCurrentProcess.id !== targetProcess.id) {
            if (!newProcessesArray.some(p => p.id === oldCurrentProcess!.id)) {
                 newProcessesArray.push(oldCurrentProcess);
            }
        }

        proStore.processes.value = newProcessesArray;
    }

    return {
        toogleOnFocus,
        launchApp
    };
};