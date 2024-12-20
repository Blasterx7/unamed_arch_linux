import { defineStore } from 'pinia'

export const useSetStore = defineStore('setting', () => {

    const activeBg = ref({ src: '', text: '' })

    function setActiveBg(bg: { src: string, text: string }) {
        activeBg.value = bg
    }

    return {
        activeBg,
        setActiveBg,
    }
})