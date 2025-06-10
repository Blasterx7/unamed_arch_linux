import { defineStore } from 'pinia'
import type { IProcess } from '~/shared/models';
import { TStatus } from '~/shared/types';


export const useProcessStore = defineStore('process', () => {
    const processes = shallowRef<IProcess[]>([])

    const currentProcess = shallowRef<IProcess | null>(null)

    const parsedApp = computed(() => {
        const grouped = processes.value.reduce((acc: { [key: string]: { number: number, pro: IProcess[] } }, curr) => {
            if (!acc[curr.name]) {
                acc[curr.name] = {
                    number: 1,
                    pro: [curr],
                };
            } else {
                acc[curr.name].number++;
                acc[curr.name].pro.push(curr);
            }
            return acc;
        }, {});

        if (currentProcess.value) {
            if (!grouped[currentProcess.value.name]) {
                grouped[currentProcess.value.name] = {
                    number: 1,
                    pro: [currentProcess.value],
                };
            } else {
                grouped[currentProcess.value.name].number++;
                grouped[currentProcess.value.name].pro.push(currentProcess.value);
            }
        }

        return grouped;
    })

    const parsedAppInArray = computed(() => {
        const keys = Object.keys(parsedApp.value);
        return keys.map((key) => {
            return {
                name: key,
                ...parsedApp.value[key],
            };
        });
    });

    function setStatutNormal(id: string) {
        if (!id) {
            console.warn("setStatutNormal called with an empty or null id.");
            return;
        }
        const indexInProcesses = processes.value.findIndex((p) => p.id === id);

        if (indexInProcesses > -1) { // Corrected index check
            processes.value[indexInProcesses].status = TStatus.NORM;
            processes.value[indexInProcesses].key = 1; // Retaining original key assignment logic
        }
        else if (currentProcess.value && currentProcess.value.id === id) {
            currentProcess.value.status = TStatus.NORM;
            currentProcess.value.key = 1; // Retaining original key assignment logic
        } else {
            // Optional: console.warn(`setStatutNormal: Process with id ${id} not found.`);
            // Decided to keep it silent if not found, as original code was also silent.
        }
    }

    function setStatutMin(id: string) {
        if (!id) {
            console.warn("setStatutMin called with an empty or null id.");
            return;
        }
        const indexInProcesses = processes.value.findIndex((p) => p.id === id);

        if (indexInProcesses > -1) { // Corrected index check
            processes.value[indexInProcesses].status = TStatus.MIN;
            processes.value[indexInProcesses].key = 1; // Retaining original key assignment logic
            // Removed instance?.emit(...) call
        }
        else if (currentProcess.value && currentProcess.value.id === id) {
            currentProcess.value.status = TStatus.MIN;
            currentProcess.value.key = 1; // Retaining original key assignment logic
            // Removed instance?.emit(...) call
            // Note: Further logic might be needed here or in a calling function
            // to move a minimized currentProcess to the background processes list
            // and select a new currentProcess. This fix addresses only the
            // immediate issues of index check and emit removal.
        } else {
            // Optional: console.warn(`setStatutMin: Process with id ${id} not found.`);
            // Decided to keep it silent if not found.
        }
    }

    function getProcesses() {
        return processes.value
    }

    function getCurrentProcess() {
        return currentProcess.value
    }

    function addProcess(process: IProcess) {
        processes.value.push(process)
    }

    function setCurrentProcess(process: IProcess) {
        currentProcess.value = process
    }

    function clearCurrentProcess() {
        currentProcess.value = null
    }

    function removeProcess(id: string) {
        if (!id) {
            console.warn("removeProcess called with an empty or null id.");
            return;
        }

        const oldProcesses = processes.value;
        // Filter out the process to be removed. This creates a new array.
        processes.value = oldProcesses.filter(process => process.id !== id);

        // Check if the current process was the one removed
        if (currentProcess.value?.id === id) {
            currentProcess.value = null; // Set to null first
        }

        // If currentProcess is now null (either it was removed or was already null),
        // and there are processes remaining in the list,
        // set the last one in the list as the new currentProcess.
        // This ensures an active window is prioritized if available.
        if (currentProcess.value === null && processes.value.length > 0) {
            currentProcess.value = processes.value[processes.value.length - 1];
        }
    }

    return {
        processes,
        currentProcess,
        parsedAppInArray,
        getProcesses,
        setStatutNormal,
        setStatutMin,
        getCurrentProcess,
        addProcess,
        setCurrentProcess,
        clearCurrentProcess,
        removeProcess,
    }
})