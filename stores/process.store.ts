import { defineStore } from 'pinia'
import type { IProcess } from '~/shared/models';
import { TStatus } from '~/shared/types';


export const useProcessStore = defineStore('process', () => {
    const processes = shallowRef<IProcess[]>([])

    const currentProcess = shallowRef<IProcess | null>(null)

    const acParsedAppInArray = shallowRef()

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
        const index = processes.value.findIndex((p) => {
            return p.id === id
        })

        if (index > 0) {
            processes.value[index].status = TStatus.NORM
            processes.value[index].key = 1
        }
        else {
            if (currentProcess.value && currentProcess.value.id === id) {
                currentProcess.value.status = TStatus.NORM
                currentProcess.value.key = 1
            }
        }
    }

    function setStatutMin(id: string) {
        const instance = getCurrentInstance()
        const index = processes.value.findIndex((p) => {
            return p.id === id
        })

        if (index > 0) {
            processes.value[index].status = TStatus.MIN
            processes.value[index].key = 1
            instance?.emit('update:processes', processes.value)
        }
        else {
            if (currentProcess.value && currentProcess.value.id === id) {
                currentProcess.value.status = TStatus.MIN
                currentProcess.value.key = 1
                instance?.emit('update:currentProcess', currentProcess.value)
            }
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
        const index = processes.value.findIndex((process) => process.id === id)
        if (index > -1) {
            processes.value.splice(index, 1)
            return;
        }

        if (processes.value.length > 0) {
            currentProcess.value = processes.value[processes.value.length - 1];
            processes.value.splice((processes.value.length - 1), 1);
        } else {
            currentProcess.value = null;
        }
    }

    return {
        processes,
        currentProcess,
        parsedAppInArray,
        acParsedAppInArray,
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