import type { TStatus } from "../types";

interface IProcess {
    id: string;
    name: string;
    description: string;
    key: number;
    icon?: string;
    status: TStatus;
    program: IProgram;
    created?: string;
    updated?: string;
}

interface IProgram {
    id?: string;
    name: string;
    components: string | Component;
    icon?: string;
}

interface ITe {
    name: string;
    number: number;
    pro: IProcess[];
}

export type {
    IProcess,
    IProgram,
    ITe,
}