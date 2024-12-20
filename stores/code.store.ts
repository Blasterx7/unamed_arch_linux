import { defineStore } from 'pinia'

export const useCodeStore = defineStore('code', () => {
    const activeCode = ref('')
    const listCode = ref([])
    const codeTest = ref('')

    return {
        activeCode,
        listCode,
        codeTest,
    }
})